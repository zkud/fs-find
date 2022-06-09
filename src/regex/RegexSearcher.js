const {Searcher, Query} = require('../core');

/**
 * Searcher with regex possibilities
 */
class RegexSearcher extends Searcher {
  // Valid jsdoc, but invalid from eslint's point of view
  // due to versions
  // eslint-disable-next-line valid-jsdoc
  /**
   * @param {string|string[]} source
   * @param {RegExp} pathPattern
   * @param {RegExp} contentPattern
   * @return {string[][]} regex matches
   */
  async findMatches(source, pathPattern, contentPattern) {
    return this.search(
        new Query()
            .from(source)
            .filterBy(({path}) => pathPattern.test(path))
            .mapAs((content) => content.match(contentPattern)),
    );
  }

  /**
   * @param {string|string[]} source
   * @param {RegExp} pathPattern
   * @param {RegExp} contentPattern
   * @return {boolean} Count of matches
   */
  async countMatches(source, pathPattern, contentPattern) {
    return this.search(
        new Query()
            .from(source)
            .filterBy(({path}) => pathPattern.test(path))
            .mapAs((content) => content.match(contentPattern)?.length ?? 0)
            .reduceAs((a, b) => a + b, 0),
    );
  }

  /**
   * @param {string|string[]} source
   * @param {RegExp} pathPattern
   * @param {RegExp} contentPattern
   * @return {boolean} Match is present
   */
  async testMatches(source, pathPattern, contentPattern) {
    return this.search(
        new Query()
            .from(source)
            .filterBy(({path}) => pathPattern.test(path))
            .mapAs((content) => contentPattern.test(content))
            .reduceAs((a, b) => a || b, false),
    );
  }
}

module.exports = RegexSearcher;
