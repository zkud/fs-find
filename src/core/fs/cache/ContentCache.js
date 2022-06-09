/* istanbul ignore file */
// It's overkill to test abstract base classes

/**
 * File Content Cache
 */
class ContentCache {
  /**
   * @abstract
   * @param {number} capacity Required capacity to store the content
   * @return {boolean}
   */
  hasEnougthCapacity(capacity) {
    return true;
  }

  /**
   * @abstract
   * @param {string} path Absolute path to the file
   * @return {boolean} Whether the file exists in the cache
   */
  has(path) {
    return false;
  }

  /**
   * @abstract
   * @param {string} path Absolute path to the file
   * @param {string} content File's content
   */
  set(path, content) {
  }

  /**
   * @abstract
   * @param {string} path Absolute path to the file
   * @return {string} File's content
   */
  get(path) {
  }
}

module.exports = ContentCache;
