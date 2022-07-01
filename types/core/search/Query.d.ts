export = Query;
declare class Query<T = any, R = any> {
    from(path: string | string[]): Query<T, R>;
    filterBy(fun: (entry: typeof import("../fs/Entry")) => boolean | ((entry: typeof import("../fs/Entry"), info: typeof import("../fs/FileMetaInfo")) => boolean)): Query<T, R>;
    mapAs(fun: (content: string) => T | ((content: string, info: typeof import("../fs/FileMetaInfo")) => T)): Query<T, R>;
    reduceAs(fun: (arg0: R, arg1: T) => R, accumulator: R): Query<T, R>;
    get roots(): string[];
    get filterFunction(): (arg0: typeof import("../fs/Entry")) => boolean;
    get mapFunction(): (arg0: string) => T | ((arg0: string, arg1: typeof import("../fs/FileMetaInfo")) => T);
    get reduceFunction(): (arg0: R, arg1: T) => R;
    get reduceAccumulator(): R;
    isValid(): boolean;
    requiresMetaInfo(): boolean;
    filterFunctionRequiresMetaInfo(): boolean;
    mapFunctionRequiresMetaInfo(): boolean;
    requiresReduce(): boolean;
}
