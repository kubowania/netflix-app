export interface User {
  _id?: string;
  email: string;
  password: string;
  name: string;
  subscription?: 'basic' | 'standard' | 'premium';
  watchlist?: string[];
  createdAt?: Date;
}

export interface Movie {
  _id?: string;
  title: string;
  description: string;
  genre: string[];
  releaseYear: number;
  duration: number; // in minutes
  rating: number; // 1-10
  imageUrl: string;
  trailerUrl?: string;
  videoUrl?: string;
  category: 'movie' | 'series';
  featured?: boolean;
  trending?: boolean;
  createdAt?: Date;
}

export interface Episode {
  _id?: string;
  title: string;
  description: string;
  season: number;
  episode: number;
  duration: number;
  videoUrl?: string;
  imageUrl: string;
}

export interface Series extends Omit<Movie, 'duration' | 'category'> {
  seasons: number;
  episodes?: Episode[];
  category: 'series';
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  subscription?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
