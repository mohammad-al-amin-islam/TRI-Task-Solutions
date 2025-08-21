interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class InMemoryCache {
  private cache = new Map<string, CacheItem<any>>();
  private defaultTTL: number;
  private cleanupInterval?: NodeJS.Timeout;

  constructor(defaultTTL = 3600000) { // Default 1 hour TTL
    this.defaultTTL = defaultTTL;
    
    // Clean up expired items every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 300000);
  }

  // Set cache item with optional TTL
  set<T>(key: string, data: T, ttl?: number): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    };
    
    this.cache.set(key, item);
    console.log(`💾 Cache SET: ${key} (TTL: ${item.ttl}ms)`);
  }

  // Get cache item if not expired
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      console.log(`❌ Cache MISS: ${key}`);
      return null;
    }

    // Check if expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      console.log(`⏰ Cache EXPIRED: ${key}`);
      return null;
    }

    console.log(`✅ Cache HIT: ${key}`);
    return item.data as T;
  }

  // Check if key exists and is not expired
  has(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }

    // Check if expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  // Delete specific key
  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      console.log(`🗑️ Cache DELETE: ${key}`);
    }
    return deleted;
  }

  // Clear all cache
  clear(): void {
    const size = this.cache.size;
    this.cache.clear();
    console.log(`🧹 Cache CLEARED: ${size} items removed`);
  }

  // Destroy cache and cleanup interval
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = undefined;
    }
    this.clear();
  }

  // Get cache statistics
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  // Clean up expired items
  private cleanup(): void {
    const now = Date.now();
    let expiredCount = 0;

    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
        expiredCount++;
      }
    }

    if (expiredCount > 0) {
      console.log(`🧹 Cache cleanup: ${expiredCount} expired items removed`);
    }
  }
}

// Create singleton cache instance
export const cache = new InMemoryCache();