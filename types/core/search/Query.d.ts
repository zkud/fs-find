export = Query;
declare class Query<T = any, R = any> {
    from(path: string | string[]): Query<T, R>;
    filterBy(fun: (arg0: typeof import("../fs/Entry")) => boolean): Query<T, R>;
    mapAs(fun: (arg0: string) => T): Query<T, R>;
    reduceAs(fun: (arg0: R, arg1: T) => R, accumulator: R): Query<T, R>;
    get roots(): string[];
    get filterFunction(): (arg0: typeof import("../fs/Entry")) => boolean;
    get mapFunction(): (arg0: string) => T;
    get reduceFunction(): (arg0: R, arg1: T) => R;
    get reduceAccumulator(): R;
    isValid(): boolean;
    requiresReduce(): boolean;
    #private;
}
//# sourceMappingURL=Query.d.ts.map