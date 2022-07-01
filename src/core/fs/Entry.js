/**
 * File System entry
 */
class Entry {
  /** @private */
  #path;
  /** @private */
  #isFile;

  /**
   * Creates a new Entry
   * @param {string} path
   * @param {boolean} isFile
   */
  constructor(path, isFile) {
    this.#path = path;
    this.#isFile = isFile;
  }

  /**
   * @return {string}
   */
  get path() {
    return this.#path;
  }

  /**
   * @return {boolean}
   */
  get isFile() {
    return this.#isFile;
  }

  /**
   * @return {boolean}
   */
  get isDirectory() {
    return !this.#isFile;
  }
}

module.exports = Entry;
