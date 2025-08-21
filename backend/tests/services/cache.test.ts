import { InMemoryCache } from '../../src/services/cache';

describe('InMemoryCache', () => {
  let cache: InMemoryCache;

  beforeEach(() => {
    cache = new InMemoryCache(1000); // 1 second TTL for testing
  });

  afterEach(() => {
    cache.destroy(); // Properly cleanup intervals
  });

  describe('set and get', () => {
    it('should store and retrieve data', () => {
      const testData = { name: 'Luke Skywalker', id: '1' };
      cache.set('test-key', testData);
      
      const retrieved = cache.get('test-key');
      expect(retrieved).toEqual(testData);
    });

    it('should return null for non-existent key', () => {
      const result = cache.get('non-existent-key');
      expect(result).toBeNull();
    });

    it('should handle different data types', () => {
      cache.set('string', 'test string');
      cache.set('number', 42);
      cache.set('boolean', true);
      cache.set('array', [1, 2, 3]);
      cache.set('object', { test: 'value' });

      expect(cache.get('string')).toBe('test string');
      expect(cache.get('number')).toBe(42);
      expect(cache.get('boolean')).toBe(true);
      expect(cache.get('array')).toEqual([1, 2, 3]);
      expect(cache.get('object')).toEqual({ test: 'value' });
    });
  });

  describe('TTL (Time To Live)', () => {
    it('should expire items after TTL', async () => {
      cache.set('expiring-key', 'test data', 100); // 100ms TTL
      
      // Should be available immediately
      expect(cache.get('expiring-key')).toBe('test data');
      
      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Should be expired
      expect(cache.get('expiring-key')).toBeNull();
    });

    it('should use default TTL when not specified', async () => {
      cache.set('default-ttl-key', 'test data');
      
      // Should be available immediately
      expect(cache.get('default-ttl-key')).toBe('test data');
    });
  });

  describe('has', () => {
    it('should return true for existing non-expired items', () => {
      cache.set('existing-key', 'test data');
      expect(cache.has('existing-key')).toBe(true);
    });

    it('should return false for non-existent items', () => {
      expect(cache.has('non-existent-key')).toBe(false);
    });

    it('should return false for expired items', async () => {
      cache.set('expiring-key', 'test data', 50); // 50ms TTL
      
      expect(cache.has('expiring-key')).toBe(true);
      
      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(cache.has('expiring-key')).toBe(false);
    });
  });

  describe('delete', () => {
    it('should delete existing items', () => {
      cache.set('delete-key', 'test data');
      expect(cache.has('delete-key')).toBe(true);
      
      const deleted = cache.delete('delete-key');
      expect(deleted).toBe(true);
      expect(cache.has('delete-key')).toBe(false);
    });

    it('should return false when deleting non-existent items', () => {
      const deleted = cache.delete('non-existent-key');
      expect(deleted).toBe(false);
    });
  });

  describe('clear', () => {
    it('should clear all items', () => {
      cache.set('key1', 'data1');
      cache.set('key2', 'data2');
      cache.set('key3', 'data3');
      
      expect(cache.getStats().size).toBe(3);
      
      cache.clear();
      
      expect(cache.getStats().size).toBe(0);
      expect(cache.get('key1')).toBeNull();
      expect(cache.get('key2')).toBeNull();
      expect(cache.get('key3')).toBeNull();
    });
  });

  describe('getStats', () => {
    it('should return correct statistics', () => {
      cache.set('key1', 'data1');
      cache.set('key2', 'data2');
      
      const stats = cache.getStats();
      expect(stats.size).toBe(2);
      expect(stats.keys).toContain('key1');
      expect(stats.keys).toContain('key2');
    });
  });
});