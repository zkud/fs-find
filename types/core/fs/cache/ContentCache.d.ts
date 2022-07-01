declare abstract class ContentCache {
  abstract hasEnougthCapacity(capacity: number): boolean;
  abstract has(path: string): boolean;
  abstract set(path: string, content: string): void;
  abstract get(path: string): string;
}

export = ContentCache;
