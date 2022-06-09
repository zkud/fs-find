export = ContentCache;
declare class ContentCache {
    hasEnougthCapacity(capacity: number): boolean;
    has(path: string): boolean;
    set(path: string, content: string): void;
    get(path: string): string;
}
//# sourceMappingURL=ContentCache.d.ts.map