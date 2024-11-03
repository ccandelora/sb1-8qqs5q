import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  joinedDate: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Luna Dreamweaver',
    email: 'luna@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    bio: 'Exploring the depths of consciousness through lucid dreaming',
    joinedDate: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Aiden Starlight',
    email: 'aiden@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    bio: 'Dream researcher and consciousness explorer',
    joinedDate: new Date('2024-02-01')
  },
  {
    id: '3',
    name: 'Maya Nightshade',
    email: 'maya@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    bio: 'Recording my dream journey one night at a time',
    joinedDate: new Date('2024-02-15')
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));