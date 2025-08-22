import axios, { type AxiosInstance } from 'axios';
import type { ApiResponse, Character, PaginatedResponse, SearchParams } from '../types/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        console.error('🔴 API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.error('🔴 API Response Error:', error.response?.status, error.message);
        return Promise.reject(error);
      }
    );
  }

  // Get characters with pagination and search
  async getCharacters(params: SearchParams = {}): Promise<PaginatedResponse<Partial<Character>>> {
    const response = await this.client.get<ApiResponse<PaginatedResponse<Partial<Character>>>>('/characters', {
      params
    });
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message || 'Failed to fetch characters');
    }
    
    return response.data.data;
  }

  // Get character by ID
  async getCharacterById(id: string): Promise<Character> {
    const response = await this.client.get<ApiResponse<Character>>(`/characters/${id}`);
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message || 'Failed to fetch character');
    }
    
    return response.data.data;
  }

  // Search characters
  async searchCharacters(query: string, params: SearchParams = {}): Promise<PaginatedResponse<Partial<Character>>> {
    return this.getCharacters({ ...params, query });
  }
}

export const apiClient = new ApiClient();