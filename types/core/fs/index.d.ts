declare const _exports: {
    ContentCache: typeof cache.ContentCache;
    LRUContentCache: typeof cache.LRUContentCache;
    Entry: typeof Entry;
    FileSystem: typeof FileSystem;
};
export = _exports;
import cache = require("./cache");
import Entry = require("./Entry");
import FileSystem = require("./FileSystem");
