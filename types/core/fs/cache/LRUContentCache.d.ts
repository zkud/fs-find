import ContentCache = require('./ContentCache');

declare class LRUContentCache extends ContentCache {
  constructor(maxMemorySize?: number);
  hasEnougthCapacity(capacity: number): boolean;
  has(path: string): boolean;
  set(path: string, content: string): void;
  get(path: string): string;
}

export = LRUContentCache;
