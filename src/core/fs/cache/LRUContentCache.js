const ContentCache = require('./ContentCache');
const LRUCache = require('lru-cache');

const ONE_GBYTE = 1073741824;

/**
 * LRU Cache wrapper
 */
class LRUContentCache extends ContentCache {
  /** @private */
  #cache;

  /**
   * @param {number} [maxMemorySize]
   */
  constructor(maxMemorySize = ONE_GBYTE) {
    super();
    const options = {
      maxSize: maxMemorySize,
      sizeCalculation: (value) => value.length,
    };
    this.#cache = new LRUCache(options);
  }

  /**
   * @param {number} capacity Required capacity to store the content
   * @return {boolean}
   */
  hasEnougthCapacity(capacity) {
    return this.#cache.maxSize >= capacity;
  }

  /**
   * @override
   * @param {string} path Absolute path to the file
   * @return {boolean} Whether the file exists in the cache
   */
  has(path) {
    return this.#cache.has(path);
  }

  /**
   * @override
   * @param {string} path Absolute path to the file
   * @param {string} content File's content
   */
  set(path, content) {
    this.#cache.set(path, content);
  }

  /**
   * @override
   * @param {string} path Absolute path to the file
   * @return {string} File's content
   */
  get(path) {
    return this.#cache.get(path);
  }
}

module.exports = LRUContentCache;
