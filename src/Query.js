/**
 * Search Query in the File System
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
   * @param {string} path
   * @return {Query}
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
   * @param {fun} fun
   * @return {Query}
   */
  filterBy(fun) {
    this.#filterFunction = fun;
    return this;
  }

  /**
   * @param {function} fun
   * @return {Query}
   */
  mapAs(fun) {
    this.#mapFunction = fun;
    return this;
  }

  /**
   * @param {function} fun
   * @param {T} accumulator
   * @return {Query}
   */
  reduceAs(fun, accumulator) {
    this.#reduceFunction = fun;
    this.#reduceAccumulator = accumulator;
    return this;
  }

  /**
   * @return {Array<string>}
   */
  get roots() {
    return this.#roots;
  }

  /**
   * @return {function}
   */
  get filterFunction() {
    return this.#filterFunction;
  }

  /**
   * @return {function}
   */
  get mapFunction() {
    return this.#mapFunction;
  }

  /**
   * @return {function}
   */
  get reduceFunction() {
    return this.#reduceFunction;
  }

  /**
   * @return {object}
   */
  get reduceAccumulator() {
    return this.#reduceAccumulator;
  }

  /**
   * @return {bool}
   */
  isValid() {
    return this.#rootsIsValid() &&
      this.#filterIsValid() &&
      this.#mapIsValid() &&
      this.#reduceIsValid();
  }

  /**
   * @private
   * @return {bool}
   */
  #rootsIsValid() {
    return Array.isArray(this.#roots) &&
      this.#roots.length > 0;
  }

  /**
   * @private
   * @return {bool}
   */
  #filterIsValid() {
    return typeof this.#filterFunction === 'function';
  }

  /**
   * @private
   * @return {bool}
   */
  #mapIsValid() {
    return typeof this.#mapFunction === 'function';
  }

  /**
   * @private
   * @return {bool}
   */
  #reduceIsValid() {
    if (this.#reduceFunction && this.#reduceAccumulator) {
      return true;
    }
    if (!this.#reduceFunction && !this.#reduceAccumulator) {
      return true;
    }
    return false;
  }

  /**
   * @return {bool}
   */
  requiresReduce() {
    return this.#reduceFunction && this.#reduceAccumulator;
  }
}

module.exports = Query;
