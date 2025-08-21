import { Request, Response, NextFunction } from 'express';
import { cache } from '../services/cache';
import { ApiResponse } from '../types/api';

// Cache middleware for GET requests
export const cacheMiddleware = (ttl?: number) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Create cache key from URL and query parameters
    const cacheKey = `${req.originalUrl}`;
    
    // Try to get from cache
    const cachedData = cache.get<ApiResponse<any>>(cacheKey);
    
    if (cachedData) {
      // Add cache hit header
      res.set('X-Cache', 'HIT');
      res.json(cachedData);
      return;
    }

    // Store original json method
    const originalJson = res.json;

    // Override json method to cache the response
    res.json = function(data: any) {
      // Only cache successful responses
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cache.set(cacheKey, data, ttl);
        res.set('X-Cache', 'MISS');
      }
      
      // Call original json method
      return originalJson.call(this, data);
    };

    next();
  };
};

// Cache middleware with different TTL for different endpoints
export const characterListCache = cacheMiddleware(1800000); // 30 minutes
export const characterDetailCache = cacheMiddleware(3600000); // 1 hour
export const relatedDataCache = cacheMiddleware(7200000); // 2 hours