import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient;
