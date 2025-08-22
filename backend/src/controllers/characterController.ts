import { Request, Response, NextFunction } from 'express';
import { swapiClient } from '../services/swapiClient';
import { DataTransformer } from '../services/dataTransformer';
import { cache } from '../services/cache';
import { validatePagination, validateSearch, validateCharacterId } from '../utils/validation';
import { ApiResponse, PaginatedResponse, Character } from '../types/api';
import { asyncHandler, createError } from '../middleware/errorHandler';

export class CharacterController {
  
  // Get paginated list of characters with optional search
  static getCharacters = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit, query } = validateSearch(req.query);
    
    try {
      let characters: Partial<Character>[];
      let pagination: any;

      if (query) {
        // Comprehensive search: fetch all characters and filter
        const allSwapiCharacters = await swapiClient.getAllCharacters();
        
        // Transform all characters
        const allCharacters = allSwapiCharacters.map(character => 
          DataTransformer.transformCharacterListItem(character)
        );

        // Apply enhanced search filter
        const searchTerm = query.toLowerCase().trim();
        const filteredCharacters = allCharacters.filter(character => {
          const characterName = character.name?.toLowerCase() || '';
          
          // Multiple search strategies
          return (
            // Exact match
            characterName === searchTerm ||
            // Contains search term
            characterName.includes(searchTerm) ||
            // Starts with search term
            characterName.startsWith(searchTerm) ||
            // Word boundary match (for multi-word names)
            characterName.split(' ').some(word => word.startsWith(searchTerm))
          );
        });

        // Apply pagination to filtered results
        const startIndex = (page! - 1) * limit!;
        const endIndex = startIndex + limit!;
        characters = filteredCharacters.slice(startIndex, endIndex);

        // Create pagination info for filtered results
        pagination = {
          page: page!,
          limit: limit!,
          total: filteredCharacters.length,
          totalPages: Math.ceil(filteredCharacters.length / limit!),
          hasNext: endIndex < filteredCharacters.length,
          hasPrev: page! > 1
        };

      } else {
        // Regular pagination: fetch specific page from SWAPI
        
        const swapiResponse = await swapiClient.getCharacters(page, limit);
        
        // Transform character data
        characters = swapiResponse.results.map(character => 
          DataTransformer.transformCharacterListItem(character)
        );

        // Create pagination info
        pagination = {
          page: page!,
          limit: limit!,
          total: swapiResponse.total_records,
          totalPages: swapiResponse.total_pages,
          hasNext: !!swapiResponse.next,
          hasPrev: page! > 1
        };
      }

      const response: ApiResponse<PaginatedResponse<Partial<Character>>> = {
        success: true,
        data: {
          data: characters,
          pagination
        },
        timestamp: new Date().toISOString()
      };

      res.json(response);
    } catch (error) {
      throw createError(
        `Failed to fetch characters: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500,
        'SWAPI_ERROR'
      );
    }
  });

  // Get character by ID with full details
  static getCharacterById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!validateCharacterId(id)) {
      throw createError('Invalid character ID format', 400, 'INVALID_ID');
    }

    try {
      // Get character detail from SWAPI
      const swapiCharacter = await swapiClient.getCharacterById(id);
      
      // Transform to our format with related data
      const character = await DataTransformer.transformCharacterDetail(swapiCharacter);

      const response: ApiResponse<Character> = {
        success: true,
        data: character,
        timestamp: new Date().toISOString()
      };

      res.json(response);
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        throw createError(`Character with ID ${id} not found`, 404, 'CHARACTER_NOT_FOUND');
      }
      
      throw createError(
        `Failed to fetch character: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500,
        'SWAPI_ERROR'
      );
    }
  });

  // Search characters by name (alternative endpoint)
  static searchCharacters = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.query;
    
    if (!query || typeof query !== 'string') {
      throw createError('Search query is required', 400, 'MISSING_QUERY');
    }

    // Use the same logic as getCharacters but force search
    req.query = { ...req.query, query };
    return CharacterController.getCharacters(req, res, next);
  });

  // Clear character cache (for admin/debug purposes)
  static clearCache = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Clear the all_characters cache
      const deleted = cache.delete('all_characters');
      
      const response: ApiResponse<{ message: string; cacheCleared: boolean }> = {
        success: true,
        data: {
          message: deleted ? 'Character cache cleared successfully' : 'No character cache to clear',
          cacheCleared: deleted
        },
        timestamp: new Date().toISOString()
      };

      res.json(response);
    } catch (error) {
      throw createError(
        `Failed to clear cache: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500,
        'CACHE_ERROR'
      );
    }
  });
}