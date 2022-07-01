import Entry = require('./Entry');
import FileMetaInfo = require('./FileMetaInfo');
import { ContentCache } from './cache';

declare class FileSystem {
  constructor(cache?: ContentCache);
  getDirectoryEntries(path: string): Promise<Entry[]>;
  readFile(path: string): Promise<string>;
  getMetaInfo(path: string): Promise<FileMetaInfo>;
}

export = FileSystem;
