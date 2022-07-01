declare class Entry {
  constructor(path: string, isFile: boolean);
  get path(): string;
  get isFile(): boolean;
  get isDirectory(): boolean;
}

export = Entry;
