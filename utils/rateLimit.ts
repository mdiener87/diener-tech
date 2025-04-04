import type { Storage } from 'unstorage'

export interface RateLimitConfig {
  maxAttempts: number;
  windowSeconds: number;
}

export class RateLimiter {
  private storage: Storage;
  private config: RateLimitConfig;
  private storagePrefix: string = 'ratelimit:';

  constructor(storage: Storage, config: RateLimitConfig) {
    this.storage = storage;
    this.config = config;
  }

  /**
   * Create a storage key for the given IP
   */
  private getStorageKey(ip: string): string {
    return `${this.storagePrefix}${ip}`;
  }

  /**
   * Get attempts for a given IP
   */
  private async getAttempts(ip: string): Promise<number[]> {
    const key = this.getStorageKey(ip);
    try {
      // Get data from storage
      const data = await this.storage.getItem(key);
      console.log('Raw storage data:', { key, data });

      if (!data) {
        return [];
      }

      // Parse the data
      let attempts: number[];
      if (typeof data === 'string') {
        try {
          attempts = JSON.parse(data);
          if (!Array.isArray(attempts)) {
            console.warn('Attempts data is not an array, resetting', { key, data });
            return [];
          }
        } catch (error) {
          console.error('Failed to parse attempts data', { key, data, error });
          return [];
        }
      } else if (Array.isArray(data)) {
        attempts = data;
      } else {
        console.warn('Unexpected attempts data format, resetting', { key, data });
        return [];
      }

      return attempts;
    } catch (error) {
      console.error('Error getting attempts from storage', { key, error });
      return [];
    }
  }

  /**
   * Store attempts for a given IP
   */
  private async storeAttempts(ip: string, attempts: number[]): Promise<void> {
    const key = this.getStorageKey(ip);
    try {
      // Ensure we're storing a valid array
      if (!Array.isArray(attempts)) {
        console.error('Attempted to store invalid attempts data', { attempts });
        attempts = [];
      }

      // Store as JSON string
      const dataString = JSON.stringify(attempts);
      console.log('Storing attempts:', { key, attempts, dataString });
      
      // Set with expiration
      await this.storage.setItem(key, dataString, {
        // Set expiration only on KV storage (optional for other types)
        ttl: this.config.windowSeconds
      });
    } catch (error) {
      console.error('Failed to store attempts', { key, attempts, error });
    }
  }

  /**
   * Check if IP is rate limited
   */
  async isRateLimited(ip: string): Promise<boolean> {
    const now = Date.now();
    const windowStart = now - (this.config.windowSeconds * 1000);

    // Get current attempts
    let attempts = await this.getAttempts(ip);
    console.log('Retrieved attempts:', { ip, attempts });
    
    // Filter to only include recent attempts
    const recentAttempts = attempts.filter(timestamp => timestamp > windowStart);
    console.log('Recent attempts:', { ip, recentAttempts, count: recentAttempts.length });
    
    // Check if rate limited
    if (recentAttempts.length >= this.config.maxAttempts) {
      return true;
    }

    // Add the current attempt
    recentAttempts.push(now);
    
    // Store updated attempts
    await this.storeAttempts(ip, recentAttempts);

    return false;
  }

  /**
   * Get remaining attempts for an IP
   */
  async getRemainingAttempts(ip: string): Promise<number> {
    const now = Date.now();
    const windowStart = now - (this.config.windowSeconds * 1000);

    // Get current attempts
    const attempts = await this.getAttempts(ip);
    
    // Filter to only include recent attempts
    const recentAttempts = attempts.filter(timestamp => timestamp > windowStart);
    
    // Calculate remaining attempts
    const remaining = Math.max(0, this.config.maxAttempts - recentAttempts.length);
    console.log('Remaining attempts:', { ip, remaining, recentAttempts });
    
    return remaining;
  }
} 