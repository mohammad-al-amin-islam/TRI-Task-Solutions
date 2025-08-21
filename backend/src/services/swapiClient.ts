import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { cache } from './cache';
import { 
  SwapiListResponse, 
  SwapiDetailResponse, 
  SwapiCharacter, 
  SwapiCharacterDetail,
  SwapiPlanet,
  SwapiFilm,
  SwapiSpecies,
  SwapiVehicle,
  SwapiStarship
} from '../types/swapi';

class SwapiClient {
  private client: AxiosInstance;
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.SWAPI_BASE_URL || 'https://swapi.tech/api';
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log(`🌐 SWAPI Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('🔴 SWAPI Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => {
        console.log(`✅ SWAPI Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('🔴 SWAPI Response Error:', error.response?.status, error.message);
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: any): Error {
    if (error.response) {
      // Server responded with error status
      return new Error(`SWAPI Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // Request was made but no response received
      return new Error('SWAPI Error: No response received from server');
    } else {
      // Something else happened
      return new Error(`SWAPI Error: ${error.message}`);
    }
  }

  // Get all characters with pagination
  async getCharacters(page = 1, limit = 10): Promise<SwapiListResponse<SwapiCharacter>> {
    const response: AxiosResponse<SwapiListResponse<SwapiCharacter>> = await this.client.get(
      `/people?page=${page}&limit=${limit}`
    );
    return response.data;
  }

  // Get all characters from all pages (for comprehensive search)
  async getAllCharacters(): Promise<SwapiCharacter[]> {
    const cacheKey = 'all_characters';
    
    // Check cache first
    const cachedCharacters = cache.get<SwapiCharacter[]>(cacheKey);
    if (cachedCharacters) {
      console.log(`✅ Using cached characters: ${cachedCharacters.length} characters`);
      return cachedCharacters;
    }

    const allCharacters: SwapiCharacter[] = [];
    let currentPage = 1;
    let hasNextPage = true;

    console.log('🔄 Fetching all characters from SWAPI for comprehensive search...');

    while (hasNextPage) {
      try {
        const response = await this.getCharacters(currentPage, 100); // Use max limit
        allCharacters.push(...response.results);
        
        hasNextPage = !!response.next;
        currentPage++;
        
        console.log(`📄 Fetched page ${currentPage - 1}: ${response.results.length} characters`);
        
        // Add a small delay to be respectful to the API
        if (hasNextPage) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error(`❌ Error fetching page ${currentPage}:`, error);
        throw error;
      }
    }

    console.log(`✅ Total characters fetched: ${allCharacters.length}`);
    
    // Cache the results for 30 minutes (1800000ms)
    cache.set(cacheKey, allCharacters, 1800000);
    
    return allCharacters;
  }

  // Get character by ID
  async getCharacterById(id: string): Promise<SwapiCharacterDetail> {
    const response: AxiosResponse<SwapiDetailResponse<SwapiCharacterDetail>> = await this.client.get(
      `/people/${id}`
    );
    return response.data.result.properties;
  }

  // Get planet by ID
  async getPlanetById(id: string): Promise<SwapiPlanet> {
    const response: AxiosResponse<SwapiDetailResponse<SwapiPlanet>> = await this.client.get(
      `/planets/${id}`
    );
    return response.data.result.properties;
  }

  // Get film by ID
  async getFilmById(id: string): Promise<SwapiFilm> {
    const response: AxiosResponse<SwapiDetailResponse<SwapiFilm>> = await this.client.get(
      `/films/${id}`
    );
    return response.data.result.properties;
  }

  // Get species by ID
  async getSpeciesById(id: string): Promise<SwapiSpecies> {
    const response: AxiosResponse<SwapiDetailResponse<SwapiSpecies>> = await this.client.get(
      `/species/${id}`
    );
    return response.data.result.properties;
  }

  // Get vehicle by ID
  async getVehicleById(id: string): Promise<SwapiVehicle> {
    const response: AxiosResponse<SwapiDetailResponse<SwapiVehicle>> = await this.client.get(
      `/vehicles/${id}`
    );
    return response.data.result.properties;
  }

  // Get starship by ID
  async getStarshipById(id: string): Promise<SwapiStarship> {
    const response: AxiosResponse<SwapiDetailResponse<SwapiStarship>> = await this.client.get(
      `/starships/${id}`
    );
    return response.data.result.properties;
  }

  // Extract ID from SWAPI URL
  extractIdFromUrl(url: string): string {
    const matches = url.match(/\/(\d+)\/?$/);
    return matches ? matches[1] : '';
  }
}

export const swapiClient = new SwapiClient();