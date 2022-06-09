declare const _exports: {
    Query: typeof search.Query;
    Searcher: typeof search.Searcher;
    SearchError: typeof search.SearchError;
    ContentCache: typeof import("./fs/cache/ContentCache");
    LRUContentCache: typeof import("./fs/cache/LRUContentCache");
    Entry: typeof import("./fs/Entry");
    FileSystem: typeof import("./fs/FileSystem");
};
export = _exports;
import search = require("./search");
