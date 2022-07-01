// eslint-disable-next-line no-unused-vars
const Query = require('./Query');
const SearchError = require('./SearchError');
// eslint-disable-next-line no-unused-vars
const {FileSystem, Entry} = require('../fs');

/**
 * Searches in the File System with query
 */
class Searcher {
  #fs;

  /**
   * @param {FileSystem} [fs]
   */
  constructor(fs = new FileSystem()) {
    this.#fs = fs;
  }

  /**
   * Search for the provided Query
   * @template [T=object]
   * @template [R=object]
   * @param {Query<T, R>} query
   * @return {Promise<T|R>}
   * @throws {SearchError}
   */
  async search(query) {
    this.#checkQuery(query);

    let results = await Promise.all(
        query
            .roots
            .map((path) => this.#searchInDirectory(path, query)),
    );
    results = results.flat(1);

    return this.#optionalyReduce(results, query);
  }

  /**
   * @template [T=object]
   * @template [R=object]
   * @param {Query<T, R>} query
   * @throws {SearchError}
   */
  #checkQuery(query) {
    if (!query || typeof query.isValid !== 'function' || !query.isValid()) {
      throw new SearchError('Invalid query');
    }
  }

  /**
   * @param {string} path
   * @template [T=object]
   * @template [R=object]
   * @param {Query<T, R>} query
   * @return {Promise<T[]>}
   */
  async #searchInDirectory(path, query) {
    const entries = await this.#fs.getDirectoryEntries(path);
    const [
      directoriesResults,
      filesResults,
    ] = await Promise.all([
      this.#searchInSubDirectories(entries, query),
      this.#searchInFiles(entries, query),
    ]);
    return directoriesResults.concat(filesResults);
  }

  /**
   * @param {Entry[]} entries
   * @template [T=object]
   * @template [R=object]
   * @param {Query<T, R>} query
   * @return {Promise<T[]>}
   */
  async #searchInSubDirectories(entries, query) {
    entries = entries
        .filter((entry) => entry.isDirectory)
        .map((entry) => this.#searchInDirectory(entry.path, query));
    entries = await Promise.all(entries);
    return entries.flat(1);
  }

  /**
   * @param {Entry[]} entries
   * @template [T=object]
   * @template [R=object]
   * @param {Query<T, R>} query
   * @return {Promise<T[]>}
   */
  async #searchInFiles(entries, query) {
    entries = entries
        .filter((entry) => entry.isFile)
        .filter((entry) => query.filterFunction(entry))
        .map((entry) => this.#searchInFile(entry.path, query));
    return Promise.all(entries);
  }

  /**
   * @param {string} path
   * @template [T=object]
   * @template [R=object]
   * @param {Query<T, R>} query
   * @return {Promise<T>}
   */
  async #searchInFile(path, query) {
    const content = this.#fs.readFile(path);

    if (query.mapFunctionRequiresMetaInfo) {
      const args = await Promise.all([
        content,
        this.#fs.getMetaInfo(path),
      ]);
      return query.mapFunction(...args);
    }

    return query.mapFunction(await content);
  }

  /**
   * @param {T[]} results
   * @template [T=object]
   * @template [R=object]
   * @param {Query<T, R>} query
   * @return {R}
   */
  #optionalyReduce(results, query) {
    if (query.requiresReduce()) {
      return results
          .reduce(
              query.reduceFunction,
              query.reduceAccumulator,
          );
    }
    return results;
  }
}

module.exports = Searcher;
