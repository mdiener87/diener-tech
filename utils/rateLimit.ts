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

    // Get current attempts
    const attempts = await this.storage.get(key) as number[] || [];
    
    // Filter attempts within window
    const recentAttempts = attempts.filter(timestamp => timestamp > windowStart);
    
    // Check if rate limited
    if (recentAttempts.length >= this.config.maxAttempts) {
      return true;
    }

    // Add new attempt
    recentAttempts.push(now);
    await this.storage.put(key, JSON.stringify(recentAttempts), {
      expirationTtl: this.config.windowSeconds
    });

    return false;
  }

  async getRemainingAttempts(ip: string): Promise<number> {
    const key = `ratelimit:${ip}`;
    const now = Date.now();
    const windowStart = now - (this.config.windowSeconds * 1000);

    const attempts = await this.storage.get(key) as number[] || [];
    const recentAttempts = attempts.filter(timestamp => timestamp > windowStart);

    return Math.max(0, this.config.maxAttempts - recentAttempts.length);
  }
} 