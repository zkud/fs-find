// eslint-disable-next-line no-unused-vars
const {Entry} = require('../fs');

/**
 * Search Query in the File System
 * @template [T=object]
 * @template [R=object]
 */
class Query {
  #roots;
  #filterFunction;
  #mapFunction;
  #reduceFunction;
  #reduceAccumulator;

  /**
   * Creates a new Query
   */
  constructor() {
    this.#roots = [];
    this.#filterFunction = () => true;
    this.#mapFunction = (x) => x;
  }

  /**
   * Provides a search source
   * @param {string|string[]} path
   * @return {Query<T, R>}
   */
  from(path) {
    if (Array.isArray(path)) {
      this.#roots = this.#roots.concat(path);
    } else {
      this.#roots.push(path);
    }
    return this;
  }

  /**
   * Provides a filter criteria for files
   * @param {function(Entry): boolean} fun
   * @return {Query<T, R>}
   */
  filterBy(fun) {
    this.#filterFunction = fun;
    return this;
  }

  /**
   * Provides a function to apply to each file
   * @param {function(string): T} fun
   * @return {Query<T, R>}
   */
  mapAs(fun) {
    this.#mapFunction = fun;
    return this;
  }

  /**
   * Provide a function to reduce all search results into a single value
   * @param {function(R, T): R} fun
   * @param {R} accumulator
   * @return {Query<T, R>}
   */
  reduceAs(fun, accumulator) {
    this.#reduceFunction = fun;
    this.#reduceAccumulator = accumulator;
    return this;
  }

  /**
   * @return {string[]}
   */
  get roots() {
    return this.#roots;
  }

  /**
   * @return {function(Entry): boolean}
   */
  get filterFunction() {
    return this.#filterFunction;
  }

  /**
   * @return {function(string): T}
   */
  get mapFunction() {
    return this.#mapFunction;
  }

  /**
   * @return {function(R, T): R}
   */
  get reduceFunction() {
    return this.#reduceFunction;
  }

  /**
   * @return {R}
   */
  get reduceAccumulator() {
    return this.#reduceAccumulator;
  }

  /**
   * @return {boolean}
   */
  isValid() {
    return this.#rootsIsValid() &&
      this.#filterIsValid() &&
      this.#mapIsValid();
  }

  /**
   * @return {boolean}
   */
  #rootsIsValid() {
    return Array.isArray(this.#roots) &&
      this.#roots.length > 0;
  }

  /**
   * @return {boolean}
   */
  #filterIsValid() {
    return typeof this.#filterFunction === 'function';
  }

  /**
   * @return {boolean}
   */
  #mapIsValid() {
    return typeof this.#mapFunction === 'function';
  }

  /**
   * @return {boolean}
   */
  requiresReduce() {
    return this.#reduceFunction;
  }
}

module.exports = Query;
