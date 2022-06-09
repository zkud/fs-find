export = RegexSearcher;
declare class RegexSearcher extends Searcher {
    findMatches(source: string | string[], pathPattern: RegExp, contentPattern: RegExp): string[][];
    countMatches(source: string | string[], pathPattern: RegExp, contentPattern: RegExp): boolean;
    testMatches(source: string | string[], pathPattern: RegExp, contentPattern: RegExp): boolean;
}
import { Searcher } from "../core/search";
