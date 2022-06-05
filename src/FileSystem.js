const fs = require('fs').promises;
const path = require('path');

/**
 * FS Wrapper
 */
class FileSystem {
  /**
   * @param {string} path
   * @return {fs.Dirent}
   */
  async getDirectoryEntries(path) {
    const entries = await fs.readdir(
        path,
        {withFileTypes: true},
    );
    return entries
        .map((entry) => this.#addPath(path, entry));
  }

  /**
   * @param {string} root
   * @param {fs.Dirent} entry
   * @return {fs.Dirent}
   */
  #addPath(root, entry) {
    entry.path = path.resolve(root, entry.name);
    return entry;
  }

  /**
   * @param {string} path
   * @return {string}
   */
  async readFile(path) {
    const content = await fs.readFile(
        path,
        {encoding: 'utf8'},
    );
    return content;
  }
}

module.exports = FileSystem;
