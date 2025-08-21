// API Response Types (matching backend)
export interface Character {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld?: Planet;
  films: Film[];
  species: Species[];
  image_url?: string;
  created: string;
  edited: string;
}

export interface Planet {
  id: string;
  name: string;
  climate: string;
  terrain: string;
  population: string;
  diameter: string;
  gravity: string;
}

export interface Film {
  id: string;
  title: string;
  episode_id: number;
  director: string;
  producer: string;
  release_date: string;
}

export interface Species {
  id: string;
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  language: string;
  homeworld?: string;
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Search
export interface SearchParams extends PaginationParams {
  query?: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}