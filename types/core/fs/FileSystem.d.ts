export = FileSystem;
declare class FileSystem {
    constructor(cache?: ContentCache);
    getDirectoryEntries(path: string): Promise<Entry[]>;
    readFile(path: string): Promise<string>;
    #private;
}
import Entry = require("./Entry");
import { ContentCache } from "./cache";
//# sourceMappingURL=FileSystem.d.ts.map