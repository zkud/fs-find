export = FileSystem;
declare class FileSystem {
    constructor(cache?: ContentCache);
    getDirectoryEntries(path: string): Promise<Entry[]>;
    readFile(path: string): Promise<string>;
}
import Entry = require("./Entry");
import { ContentCache } from "./cache";
