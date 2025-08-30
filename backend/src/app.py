from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from clerk_backend_api import Clerk 
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from sqlalchemy.sql import func
from .db import AsyncSessionLocal, User, Note  # Note the dot before db
from .utils import authenticate_request  # Note the dot before utils
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date
import os
import uuid

# Rest of your code stays the same...
clerk_sdk = Clerk(bearer_auth=os.getenv("CLERK_SECRET_KEY"))

app = FastAPI(title="Notes API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Dependencies
async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

async def get_current_user(request: Request):
    return authenticate_request(request)

# Pydantic models
class UserCreate(BaseModel):
    name: str
    email: EmailStr

class UserResponse(BaseModel):
    id: uuid.UUID
    name: str
    email: str
    created_at: str

class NoteCreate(BaseModel):
    tile: str
    note: str
    tags: Optional[List[str]] = []
    date: Optional[date] = None
    star: Optional[bool] = False

class NoteUpdate(BaseModel):
    tile: Optional[str] = None
    note: Optional[str] = None
    tags: Optional[List[str]] = None
    date: Optional[date] = None
    star: Optional[bool] = None

class NoteResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    tile: str
    note: str
    tags: List[str]
    date: date
    edited_at: str
    star: bool

# Health check routes
@app.get("/")
async def root():
    return {"message": "Notes API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# User routes
@app.post("/users/", response_model=UserResponse)
async def create_user(
    user_data: UserCreate,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Check if user already exists
    result = await db.execute(
        select(User).where(User.email == user_data.email)
    )
    existing_user = result.scalar_one_or_none()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    
    # Create new user
    db_user = User(
        name=user_data.name,
        email=user_data.email
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    
    return UserResponse(
        id=db_user.id,
        name=db_user.name,
        email=db_user.email,
        created_at=db_user.created_at.isoformat()
    )

@app.get("/users/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Get user by email or implement your Clerk user linking logic
    result = await db.execute(select(User).limit(1))
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        created_at=user.created_at.isoformat()
    )

@app.get("/users/", response_model=List[UserResponse])
async def get_users(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(User))
    users = result.scalars().all()
    
    return [
        UserResponse(
            id=user.id,
            name=user.name,
            email=user.email,
            created_at=user.created_at.isoformat()
        )
        for user in users
    ]

# Note routes
@app.post("/notes/", response_model=NoteResponse)
async def create_note(
    note_data: NoteCreate,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Get user (implement proper user linking with Clerk)
    result = await db.execute(select(User).limit(1))
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Create note
    db_note = Note(
        user_id=user.id,
        tile=note_data.tile,
        note=note_data.note,
        tags=note_data.tags or [],
        date=note_data.date,
        star=note_data.star or False
    )
    db.add(db_note)
    await db.commit()
    await db.refresh(db_note)
    
    return NoteResponse(
        id=db_note.id,
        user_id=db_note.user_id,
        tile=db_note.tile,
        note=db_note.note,
        tags=db_note.tags or [],
        date=db_note.date,
        edited_at=db_note.edited_at.isoformat(),
        star=db_note.star
    )

@app.get("/notes/", response_model=List[NoteResponse])
async def get_notes(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Get user's notes
    result = await db.execute(select(User).limit(1))
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    notes_result = await db.execute(
        select(Note).where(Note.user_id == user.id).order_by(Note.edited_at.desc())
    )
    notes = notes_result.scalars().all()
    
    return [
        NoteResponse(
            id=note.id,
            user_id=note.user_id,
            tile=note.tile,
            note=note.note,
            tags=note.tags or [],
            date=note.date,
            edited_at=note.edited_at.isoformat(),
            star=note.star
        )
        for note in notes
    ]

@app.get("/notes/{note_id}", response_model=NoteResponse)
async def get_note(
    note_id: uuid.UUID,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Note).where(Note.id == note_id))
    note = result.scalar_one_or_none()
    
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    return NoteResponse(
        id=note.id,
        user_id=note.user_id,
        tile=note.tile,
        note=note.note,
        tags=note.tags or [],
        date=note.date,
        edited_at=note.edited_at.isoformat(),
        star=note.star
    )

@app.put("/notes/{note_id}", response_model=NoteResponse)
async def update_note(
    note_id: uuid.UUID,
    note_data: NoteUpdate,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Check if note exists
    result = await db.execute(select(Note).where(Note.id == note_id))
    note = result.scalar_one_or_none()
    
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    # Update note
    update_data = {}
    if note_data.tile is not None:
        update_data["tile"] = note_data.tile
    if note_data.note is not None:
        update_data["note"] = note_data.note
    if note_data.tags is not None:
        update_data["tags"] = note_data.tags
    if note_data.date is not None:
        update_data["date"] = note_data.date
    if note_data.star is not None:
        update_data["star"] = note_data.star
    
    if update_data:
        # Add edited_at timestamp
        update_data["edited_at"] = func.now()
        await db.execute(
            update(Note).where(Note.id == note_id).values(**update_data)
        )
        await db.commit()
        await db.refresh(note)
    
    return NoteResponse(
        id=note.id,
        user_id=note.user_id,
        tile=note.tile,
        note=note.note,
        tags=note.tags or [],
        date=note.date,
        edited_at=note.edited_at.isoformat(),
        star=note.star
    )

@app.delete("/notes/{note_id}")
async def delete_note(
    note_id: uuid.UUID,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Note).where(Note.id == note_id))
    note = result.scalar_one_or_none()
    
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    await db.execute(delete(Note).where(Note.id == note_id))
    await db.commit()
    
    return {"message": "Note deleted successfully"}

@app.get("/notes/starred/all", response_model=List[NoteResponse])
async def get_starred_notes(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(User).limit(1))
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    notes_result = await db.execute(
        select(Note).where(Note.user_id == user.id, Note.star == True).order_by(Note.edited_at.desc())
    )
    notes = notes_result.scalars().all()
    
    return [
        NoteResponse(
            id=note.id,
            user_id=note.user_id,
            tile=note.tile,
            note=note.note,
            tags=note.tags or [],
            date=note.date,
            edited_at=note.edited_at.isoformat(),
            star=note.star
        )
        for note in notes
    ]

@app.patch("/notes/{note_id}/star")
async def toggle_star(
    note_id: uuid.UUID,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Note).where(Note.id == note_id))
    note = result.scalar_one_or_none()
    
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    await db.execute(
        update(Note).where(Note.id == note_id).values(star=not note.star)
    )
    await db.commit()
    
    return {"message": f"Note {'starred' if not note.star else 'unstarred'} successfully"}