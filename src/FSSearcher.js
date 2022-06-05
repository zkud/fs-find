// eslint-disable-next-line no-unused-vars
const Query = require('./Query');
const FileSystem = require('./FileSystem');
const SearchError = require('./SearchError');

/**
 * Searches in the File System with query
 */
class FSSearcher {
  #fs;

  /**
   * @param {FileSystem} fs
   */
  constructor(fs = new FileSystem()) {
    this.#fs = fs;
  }

  /**
   * @param {Query} query
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
   * @param {Query} query
   */
  #checkQuery(query) {
    if (!query || typeof query.isValid !== 'function' || !query.isValid()) {
      throw new SearchError('Invalid query');
    }
  }

  /**
   * @param {string} path
   * @param {Query} query
   * @return {Promise<Array>}
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
   * @param {Promise<Array<*>>} entries
   * @param {Query} query
   */
  async #searchInSubDirectories(entries, query) {
    entries = entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => this.#searchInDirectory(entry.path, query));
    return Promise.all(entries);
  }

  /**
   * @param {Promise<Array<*>>} entries
   * @param {Query} query
   */
  async #searchInFiles(entries, query) {
    entries = entries
        .filter((entry) => entry.isFile())
        .filter((entry) => query.filterFunction(entry))
        .map((entry) => this.#searchInFile(entry.path, query));
    return Promise.all(entries);
  }

  /**
   * @param {string} path
   * @param {Query} query
   */
  async #searchInFile(path, {mapFunction}) {
    const content = await this.#fs.readFile(path);
    return mapFunction(content);
  }

  /**
   * @param {*} results
   * @param {Query} query
   * @return {*}
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

module.exports = FSSearcher;
