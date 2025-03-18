export interface RateLimitConfig {
  maxAttempts: number;
  windowSeconds: number;
}

export class RateLimiter {
  private namespace: KVNamespace;
  private config: RateLimitConfig;

  constructor(namespace: KVNamespace, config: RateLimitConfig) {
    this.namespace = namespace;
    this.config = config;
  }

  async isRateLimited(ip: string): Promise<boolean> {
    const key = `ratelimit:${ip}`;
    const now = Date.now();
    const windowStart = now - (this.config.windowSeconds * 1000);

    // Get current attempts
    const attempts = await this.namespace.get(key, 'json') as number[] || [];
    
    // Filter attempts within window
    const recentAttempts = attempts.filter(timestamp => timestamp > windowStart);
    
    // Check if rate limited
    if (recentAttempts.length >= this.config.maxAttempts) {
      return true;
    }

    // Add new attempt
    recentAttempts.push(now);
    await this.namespace.put(key, JSON.stringify(recentAttempts), {
      expirationTtl: this.config.windowSeconds
    });

    return false;
  }

  async getRemainingAttempts(ip: string): Promise<number> {
    const key = `ratelimit:${ip}`;
    const now = Date.now();
    const windowStart = now - (this.config.windowSeconds * 1000);

    const attempts = await this.namespace.get(key, 'json') as number[] || [];
    const recentAttempts = attempts.filter(timestamp => timestamp > windowStart);

    return Math.max(0, this.config.maxAttempts - recentAttempts.length);
  }
} 