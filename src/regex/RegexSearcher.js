const {Searcher, Query} = require('../core');

/**
 * Searcher with regex possibilities
 */
class RegexSearcher extends Searcher {
  /**
   * @param {string|Array<string>} source
   * @param {RegExp} pathPattern
   * @param {RegExp} contentPattern
   * @return {Array<Array<string>>} regex matches
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
   * @param {string|Array<string>} source
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
   * @param {string|Array<string>} source
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
