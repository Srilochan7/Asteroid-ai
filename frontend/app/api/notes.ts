declare global {
  interface Window {
    Clerk?: {
      session?: {
        getToken(): Promise<string>;
      };
    };
  }
}

const API_BASE_URL = 'http://localhost:8000';

interface BackendNote {
  id: string;
  user_id: string;
  tile: string; // Note: backend uses "tile" not "title"
  note: string;
  tags: string[];
  date: string;
  edited_at: string;
  star: boolean;
}

interface FrontendNote {
  id: string;
  title: string;
  content: string;
  color: string;
  starred: boolean;
  createdAt: Date;
  tags: string[];
}

// Helper function to convert backend note to frontend format
const mapBackendToFrontend = (backendNote: BackendNote): FrontendNote => {
  const colors = [
    'bg-gradient-to-br from-primary/10 to-primary/5',
    'bg-gradient-to-br from-secondary/10 to-secondary/5',
    'bg-gradient-to-br from-accent/10 to-accent/5',
    'bg-gradient-to-br from-primary/10 to-accent/5',
    'bg-gradient-to-br from-secondary/10 to-primary/5',
    'bg-gradient-to-br from-accent/10 to-secondary/5',
  ];
  
  return {
    id: backendNote.id,
    title: backendNote.tile,
    content: backendNote.note,
    color: colors[Math.floor(Math.random() * colors.length)],
    starred: backendNote.star,
    createdAt: new Date(backendNote.edited_at),
    tags: backendNote.tags || [],
  };
};

// Helper function to convert frontend note to backend format
const mapFrontendToBackend = (frontendNote: Partial<FrontendNote>) => {
  return {
    tile: frontendNote.title,
    note: frontendNote.content,
    tags: frontendNote.tags || [],
    star: frontendNote.starred || false,
  };
};

// Get auth token from Clerk
const getAuthHeaders = async () => {
  // You'll need to get this from Clerk's useAuth hook
  const token = await window.Clerk?.session?.getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const notesApi = {
  // Fetch all notes
  async fetchNotes(): Promise<FrontendNote[]> {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/notes/`, { headers });
      
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      
      const backendNotes: BackendNote[] = await response.json();
      return backendNotes.map(mapBackendToFrontend);
    } catch (error) {
      console.error('Error fetching notes:', error);
      return [];
    }
  },

  // Create a new note
  async createNote(noteData: { title: string; content: string; tags?: string[] }): Promise<FrontendNote | null> {
    try {
      const headers = await getAuthHeaders();
      const backendData = mapFrontendToBackend({
        title: noteData.title,
        content: noteData.content,
        tags: noteData.tags,
      });

      const response = await fetch(`${API_BASE_URL}/notes/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(backendData),
      });

      if (!response.ok) {
        throw new Error('Failed to create note');
      }

      const backendNote: BackendNote = await response.json();
      return mapBackendToFrontend(backendNote);
    } catch (error) {
      console.error('Error creating note:', error);
      return null;
    }
  },

  // Update a note
  async updateNote(id: string, updates: Partial<FrontendNote>): Promise<FrontendNote | null> {
    try {
      const headers = await getAuthHeaders();
      const backendUpdates = mapFrontendToBackend(updates);

      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(backendUpdates),
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      const backendNote: BackendNote = await response.json();
      return mapBackendToFrontend(backendNote);
    } catch (error) {
      console.error('Error updating note:', error);
      return null;
    }
  },

  // Delete a note
  async deleteNote(id: string): Promise<boolean> {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'DELETE',
        headers,
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting note:', error);
      return false;
    }
  },

  // Toggle star status
  async toggleStar(id: string): Promise<boolean> {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/notes/${id}/star`, {
        method: 'PATCH',
        headers,
      });

      return response.ok;
    } catch (error) {
      console.error('Error toggling star:', error);
      return false;
    }
  },

  // Get starred notes only
  async fetchStarredNotes(): Promise<FrontendNote[]> {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/notes/starred/all`, { headers });
      
      if (!response.ok) {
        throw new Error('Failed to fetch starred notes');
      }
      
      const backendNotes: BackendNote[] = await response.json();
      return backendNotes.map(mapBackendToFrontend);
    } catch (error) {
      console.error('Error fetching starred notes:', error);
      return [];
    }
  },
};