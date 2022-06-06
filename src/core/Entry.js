/**
 * File System entry
 */
class Entry {
  #path;
  #isFile;

  /**
   * Creates a new Entry
   * @param {string} path
   * @param {bool} isFile
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
   * @return {bool}
   */
  get isFile() {
    return this.#isFile;
  }

  /**
   * @return {bool}
   */
  get isDirectory() {
    return !this.#isFile;
  }
}

module.exports = Entry;
