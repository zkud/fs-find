const fs = require('fs').promises;
const path = require('path');
const Entry = require('./Entry');

/**
 * FS Wrapper
 */
class FileSystem {
  #contentsCache;

  /**
   * Creates a new FS instance
   */
  constructor() {
    this.#contentsCache = new Map();
  }

  /**
   * @param {string} path
   * @return {Promise<Array<Entry>>}
   */
  async getDirectoryEntries(path) {
    const entries = await fs.readdir(
        path,
        {withFileTypes: true},
    );
    return entries
        .filter((entry) => entry.isDirectory() || entry.isFile())
        .map((entry) => this.#wrapIntoEntry(path, entry));
  }

  /**
   * @param {string} root
   * @param {fs.Dirent} entry
   * @return {Entry}
   */
  #wrapIntoEntry(root, entry) {
    const entryPath = path.resolve(root, entry.name);
    return new Entry(entryPath, entry.isFile());
  }

  /**
   * @param {string} path
   * @return {Promise<string>} UTF-8 encoded file's content
   */
  async readFile(path) {
    if (this.#contentsCache.has(path)) {
      return this.#contentsCache.get(path);
    }

    const content = await fs.readFile(
        path,
        {encoding: 'utf8'},
    );
    this.#contentsCache.set(path, content);

    return content;
  }
}

module.exports = FileSystem;