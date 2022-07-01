export = FileMetaInfo;
declare class FileMetaInfo {
    constructor(path: string, stats: Stats);
    get path(): string;
    get size(): number;
    get accessedAt(): Date;
    get changedAt(): Date;
    get createdAt(): Date;
}
import { Stats } from 'fs';
