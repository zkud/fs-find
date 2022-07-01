// eslint-disable-next-line no-unused-vars
const fs = require('fs').promises;

/**
 * File's meta information
 */
class FileMetaInfo {
  #path;
  #stats;

  /**
   * @param {string} path
   * @param {fs.Stats} stats
   */
  constructor(path, stats) {
    this.#path = path;
    this.#stats = stats;
  }

  /**
   * @return {string} File's path
   */
  get path() {
    return this.#path;
  }

  /**
   * @return {number} File's size in bytes
   */
  get size() {
    return this.#stats.size;
  }

  /**
   * @return {Date} The last accessed time
   */
  get accessedAt() {
    return this.#stats.atime;
  }

  /**
   * @return {Date} The last modification time
   */
  get changedAt() {
    return this.#stats.mtime;
  }

  /**
   * @return {Date} The creation time
   */
  get createdAt() {
    return this.#stats.birthtime;
  }
}

module.exports = FileMetaInfo;
