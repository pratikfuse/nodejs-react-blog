import Container from "typedi";
import { createClient, RedisClientType } from "redis";
import { CacheService } from "./cache";
import config from "config";

export function InjectCache() {
  return function (object: any, propertyName: string, index: number) {
    const cacheService = CacheService.getInstance();
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: () => {
        return cacheService;
      },
    });
  };
}
