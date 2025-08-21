import request from 'supertest';
import express from 'express';
import cors from 'cors';
import characterRoutes from '../../src/routes/characterRoutes';
import { errorHandler } from '../../src/middleware/errorHandler';

// Create test app
const createTestApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api/characters', characterRoutes);
  app.use(errorHandler);
  return app;
};

describe('Character Controller', () => {
  let app: express.Application;

  beforeEach(() => {
    app = createTestApp();
  });

  describe('GET /api/characters', () => {
    it('should return paginated characters', async () => {
      const response = await request(app)
        .get('/api/characters')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('pagination');
      expect(Array.isArray(response.body.data.data)).toBe(true);
      expect(response.body.data.pagination).toHaveProperty('page');
      expect(response.body.data.pagination).toHaveProperty('limit');
      expect(response.body.data.pagination).toHaveProperty('total');
    });

    it('should handle pagination parameters', async () => {
      const response = await request(app)
        .get('/api/characters?page=2&limit=5')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.pagination.page).toBe(2);
      expect(response.body.data.pagination.limit).toBe(5);
    });

    it('should handle search query', async () => {
      const response = await request(app)
        .get('/api/characters?query=luke')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.data.length).toBeGreaterThan(0);
      
      // Check if results contain the search term
      const hasLuke = response.body.data.data.some((character: any) => 
        character.name.toLowerCase().includes('luke')
      );
      expect(hasLuke).toBe(true);
    });

    it('should return empty results for non-existent search', async () => {
      const response = await request(app)
        .get('/api/characters?query=nonexistentcharacter123')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.data.length).toBe(0);
    });
  });

  describe('GET /api/characters/:id', () => {
    it('should return character details for valid ID', async () => {
      const response = await request(app)
        .get('/api/characters/1')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id', '1');
      expect(response.body.data).toHaveProperty('name');
      expect(response.body.data).toHaveProperty('height');
      expect(response.body.data).toHaveProperty('mass');
    });

    it('should return 404 for non-existent character', async () => {
      const response = await request(app)
        .get('/api/characters/999999')
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error.code).toBe('CHARACTER_NOT_FOUND');
    });

    it('should return 400 for invalid character ID format', async () => {
      const response = await request(app)
        .get('/api/characters/invalid-id')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error.code).toBe('INVALID_ID');
    });
  });

  describe('GET /api/characters/search', () => {
    it('should return 400 when query parameter is missing', async () => {
      const response = await request(app)
        .get('/api/characters/search')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.error.code).toBe('MISSING_QUERY');
    });

    it('should return search results when query is provided', async () => {
      const response = await request(app)
        .get('/api/characters/search?query=vader')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.data.length).toBeGreaterThan(0);
    });
  });
});