/// <reference types="@cloudflare/workers-types" />
import type { Storage } from 'unstorage'

export interface RateLimitConfig {
  maxAttempts: number;
  windowSeconds: number;
}

export interface StorageInterface {
  get(key: string): Promise<any>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

export class RateLimiter {
  private storage: StorageInterface;
  private config: RateLimitConfig;

  constructor(storage: KVNamespace | Storage, config: RateLimitConfig) {
    // Create a unified storage interface
    this.storage = {
      get: async (key: string) => {
        if ('getItem' in storage) {
          // Nitro storage
          const value = await (storage as Storage).getItem(key);
          return value ? JSON.parse(value as string) : null;
        } else {
          // Cloudflare KV
          return await (storage as KVNamespace).get(key, 'json');
        }
      },
      put: async (key: string, value: string, options?: { expirationTtl?: number }) => {
        if ('setItem' in storage) {
          // Nitro storage
          await (storage as Storage).setItem(key, value);
        } else {
          // Cloudflare KV
          await (storage as KVNamespace).put(key, value, options);
        }
      }
    };
    this.config = config;
  }

  async isRateLimited(ip: string): Promise<boolean> {
    const key = `ratelimit:${ip}`;
    const now = Date.now();
    const windowStart = now - (this.config.windowSeconds * 1000);

    // Get current attempts - handle different possible response formats
    let data = await this.storage.get(key);
    console.log('Rate limit data raw:', { key, data });
    
    let attempts: number[] = [];
    
    // Handle different possible formats of stored data
    if (data === null || data === undefined) {
      // No data found, initialize empty array
      attempts = [];
    } else if (Array.isArray(data)) {
      // Data is already an array of timestamps
      attempts = data;
    } else if (typeof data === 'object' && 'attempts' in data && Array.isArray(data.attempts)) {
      // Data is an object with attempts array property
      attempts = data.attempts;
    } else {
      // Any other format - log and reset
      console.warn('Rate limit data was in an unexpected format, resetting', { key, data });
      attempts = [];
    }
    
    console.log('Parsed attempts:', attempts);
    
    // Filter attempts within window
    const recentAttempts = attempts.filter(timestamp => timestamp > windowStart);
    
    // Check if rate limited
    if (recentAttempts.length >= this.config.maxAttempts) {
      return true;
    }

    // Add new attempt
    recentAttempts.push(now);
    
    // Store the attempts array directly
    await this.storage.put(key, JSON.stringify(recentAttempts), {
      expirationTtl: this.config.windowSeconds
    }).catch((error) => {
      console.error('Failed to update rate limit data', { key, error });
    });

    return false;
  }

  async getRemainingAttempts(ip: string): Promise<number> {
    const key = `ratelimit:${ip}`;
    const now = Date.now();
    const windowStart = now - (this.config.windowSeconds * 1000);

    // Get current attempts - handle different possible response formats
    let data = await this.storage.get(key);
    console.log('Rate limit data raw (remaining):', { key, data });
    
    let attempts: number[] = [];
    
    // Handle different possible formats of stored data - same logic as isRateLimited
    if (data === null || data === undefined) {
      attempts = [];
    } else if (Array.isArray(data)) {
      attempts = data;
    } else if (typeof data === 'object' && 'attempts' in data && Array.isArray(data.attempts)) {
      attempts = data.attempts;
    } else {
      console.warn('Rate limit data was in an unexpected format, resetting', { key, data });
      attempts = [];
    }
    
    const recentAttempts = attempts.filter(timestamp => timestamp > windowStart);

    return Math.max(0, this.config.maxAttempts - recentAttempts.length);
  }
} 