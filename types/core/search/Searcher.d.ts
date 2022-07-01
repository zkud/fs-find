import Query = require('./Query');
import FileSystem = require('../fs/FileSystem');

declare class Searcher {
  constructor(fs?: FileSystem);
  search<T = any, R = any>(query: Query<T, R>): Promise<T | R>;
}

export = Searcher;
