// eslint-disable-next-line no-unused-vars
const Query = require('./Query');
const SearchError = require('./SearchError');
// eslint-disable-next-line no-unused-vars
const {FileSystem, Entry, FileMetaInfo} = require('../fs');

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
    let files = entries.filter((entry) => entry.isFile);

    files = await this.#optionalyAppendMetaInfoToFiles(files, query);

    files = files
        .filter((properties) => query.filterFunction(...properties))
        .map(([entry, info]) => this.#searchInFile(entry.path, query, info));

    return Promise.all(files);
  }

  /**
   * @param {Entry[]} files
   * @template [T=object]
   * @template [R=object]
   * @param {Query<T, R>} query
   * @return {Promise<([Entry]|[Entry, FileMetaInfo])[]>}
   */
  async #optionalyAppendMetaInfoToFiles(files, query) {
    files = files.map((entry) => [entry]);

    if (query.requiresMetaInfo()) {
      files = files.map(([entry]) =>
        this.#appendMetaInfoToFileProperties(entry.path, [entry]),
      );
      files = await Promise.all(files);
    }

    return files;
  }

  /**
   * @param {string} path
   * @param {object[]} properties
   * @return {Promise<object[]>}
   */
  async #appendMetaInfoToFileProperties(path, properties) {
    const info = await this.#fs.getMetaInfo(path);
    return Promise.all([...properties, info]);
  }

  /**
   * @param {string} path
   * @template [T=object]
   * @template [R=object]
   * @param {Query<T, R>} query
   * @param {FileMetaInfo} [info]
   * @return {Promise<T>}
   */
  async #searchInFile(path, query, info) {
    const content = await this.#fs.readFile(path);
    return query.mapFunction(content, info);
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
