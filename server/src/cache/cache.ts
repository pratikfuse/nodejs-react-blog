import config from "config";
import { createClient, RedisClientType } from "redis";

export class CacheService {
  private _client: RedisClientType;
  private static _instance: CacheService;

  private constructor() {
    this._client = createClient({
      url: config.get("redis.url"),
      legacyMode: true,
    });
  }

  public static getInstance(): CacheService {
    if (!CacheService._instance) {
      CacheService._instance = new CacheService();
    }
    return CacheService._instance;
  }

  async connect() {
    await this._client.connect();
  }

  setCache(cacheKey: string, value: any) {
    return this._client.set(cacheKey, value);
  }

  async getCache(cacheKey: string) {
    return this._client.get(cacheKey);
  }

  async invalidateCache(cacheKey: string) {
    return this._client.del(cacheKey);
  }

  async wrapWithCache(cacheKey: string, handler: any, cb: any, ...args: any[]) {
    const response = await handler(...args);
    return response;
  }

  get client() {
    return this._client;
  }
}
