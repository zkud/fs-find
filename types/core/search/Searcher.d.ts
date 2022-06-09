export = Searcher;
declare class Searcher {
    constructor(fs?: typeof FileSystem);
    search<T = any, R = any>(query: Query<T, R>): Promise<T | R>;
    #private;
}
import Query = require("./Query");
import { FileSystem } from "../fs";
