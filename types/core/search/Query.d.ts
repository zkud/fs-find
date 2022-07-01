import {Entry, FileMetaInfo} from '../fs';

declare type FilterFunction = (entry: Entry, info: FileMetaInfo) => boolean;
declare type MapFunction<T> = (content: string, info: FileMetaInfo) => T;
declare type ReduceFunction<T, R> = (accumulator: R, value: T) => R;

declare class Query<T = any, R = any> {
  from(path: string | string[]): Query<T, R>;
  filterBy(fun: FilterFunction): Query<T, R>;
  mapAs(fun: MapFunction<T>): Query<T, R>;
  reduceAs(fun: ReduceFunction<T, R>, accumulator: R): Query<T, R>;
  get roots(): string[];
  get filterFunction(): FilterFunction;
  get mapFunction(): MapFunction<T>;
  get reduceFunction(): ReduceFunction<T, R>;
  get reduceAccumulator(): R;
  isValid(): boolean;
  requiresMetaInfo(): boolean;
  filterFunctionRequiresMetaInfo(): boolean;
  mapFunctionRequiresMetaInfo(): boolean;
  requiresReduce(): boolean;
}

export = Query;
