const fs = require('fs').promises;
const path = require('path');
const Entry = require('./Entry');
// eslint-disable-next-line no-unused-vars
const {ContentCache} = require('./cache');
const {LRUContentCache} = require('./cache');

/**
 * FS Wrapper
 */
class FileSystem {
  #contentsCache;

  /**
   * Creates a new FS instance
   * @param {ContentCache} cache to use
   */
  constructor(cache = new LRUContentCache()) {
    this.#contentsCache = cache;
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

    if (this.#contentsCache.hasEnougthCapacity(content.length)) {
      this.#contentsCache.set(path, content);
    }

    return content;
  }
}

module.exports = FileSystem;
