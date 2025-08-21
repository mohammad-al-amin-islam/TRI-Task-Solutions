import { swapiClient } from '../../src/services/swapiClient';

describe('SWAPI Client', () => {
  describe('getCharacters', () => {
    it('should fetch characters from SWAPI', async () => {
      const result = await swapiClient.getCharacters(1, 10);
      
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('total_records');
      expect(result).toHaveProperty('results');
      expect(Array.isArray(result.results)).toBe(true);
      expect(result.results.length).toBeGreaterThan(0);
      
      // Check character structure
      const character = result.results[0];
      expect(character).toHaveProperty('uid');
      expect(character).toHaveProperty('name');
      expect(character).toHaveProperty('url');
    });

    it('should handle pagination parameters', async () => {
      const result = await swapiClient.getCharacters(2, 5);
      
      expect(result.results.length).toBeLessThanOrEqual(5);
    });
  });

  describe('getCharacterById', () => {
    it('should fetch character details by ID', async () => {
      const character = await swapiClient.getCharacterById('1');
      
      expect(character).toHaveProperty('name');
      expect(character).toHaveProperty('height');
      expect(character).toHaveProperty('mass');
      expect(character).toHaveProperty('hair_color');
      expect(character).toHaveProperty('skin_color');
      expect(character).toHaveProperty('eye_color');
      expect(character).toHaveProperty('birth_year');
      expect(character).toHaveProperty('gender');
      expect(character.name).toBe('Luke Skywalker');
    });

    it('should throw error for non-existent character', async () => {
      await expect(swapiClient.getCharacterById('999999'))
        .rejects
        .toThrow();
    });
  });

  describe('extractIdFromUrl', () => {
    it('should extract ID from SWAPI URL', () => {
      const url = 'https://swapi.tech/api/people/1/';
      const id = swapiClient.extractIdFromUrl(url);
      expect(id).toBe('1');
    });

    it('should extract ID from URL without trailing slash', () => {
      const url = 'https://swapi.tech/api/people/42';
      const id = swapiClient.extractIdFromUrl(url);
      expect(id).toBe('42');
    });

    it('should return empty string for invalid URL', () => {
      const url = 'invalid-url';
      const id = swapiClient.extractIdFromUrl(url);
      expect(id).toBe('');
    });
  });
});