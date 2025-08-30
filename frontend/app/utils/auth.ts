// app/utils/auth.ts
import { clerkClient } from "@clerk/nextjs/server";

export const checkUserExists = async (email: string) => {
  const clerk = await clerkClient();
  const users = await clerk.users.getUserList({ emailAddress: [email] });
  return users.data.length > 0;
};

export const handleLogin = async (email: string) => {
  const exists = await checkUserExists(email);
  if (!exists) throw new Error("No account found. Please sign up first.");
  return `/sign-in?email=${encodeURIComponent(email)}`;
};

export const handleSignup = async (email: string) => {
  const exists = await checkUserExists(email);
  if (exists) throw new Error("Account already exists. Please sign in.");
  return `/sign-up?email=${encodeURIComponent(email)}`;
};
