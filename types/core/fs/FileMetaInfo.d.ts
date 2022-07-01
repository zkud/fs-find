import { Stats } from 'fs';

declare class FileMetaInfo {
  constructor(path: string, stats: Stats);
  get path(): string;
  get size(): number;
  get accessedAt(): Date;
  get changedAt(): Date;
  get createdAt(): Date;
}

export = FileMetaInfo;
