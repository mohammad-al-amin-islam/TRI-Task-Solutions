import { Router } from 'express';
import { CharacterController } from '../controllers/characterController';
import { characterListCache, characterDetailCache } from '../middleware/cacheMiddleware';

const router = Router();

// GET /api/characters - Get paginated list of characters with optional search
router.get('/', characterListCache, CharacterController.getCharacters);

// GET /api/characters/search/:query - Search characters (alternative endpoint)
router.get('/search', characterListCache, CharacterController.searchCharacters);

// POST /api/characters/cache/clear - Clear character cache (admin/debug)
router.post('/cache/clear', CharacterController.clearCache);

// GET /api/characters/:id - Get character by ID with full details
router.get('/:id', characterDetailCache, CharacterController.getCharacterById);

export default router;