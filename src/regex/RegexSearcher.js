const {Searcher, Query} = require('../core');

/**
 * The Searcher descendant with some regex-pattern searching possibilities
 */
class RegexSearcher extends Searcher {
  // Valid jsdoc, but invalid from eslint's point of view
  // due to versions
  // eslint-disable-next-line valid-jsdoc
  /**
   * Find all matches of a `contentPattern` in `source(s)`
   * with file names matching of `pathPattern`
   *
   * @example
   * const searcher = new RegexSearcher();
   * const jsFile = /^(?!.*\.test\.js$).*\.js$/;
   * await searcher.findMatches('./', jsFile, /function/g)
   * // returns [['function', ...], ...]
   *
   * @param {string|string[]} source Source(s) to search for
   * @param {RegExp} pathPattern Path matching pattern
   * @param {RegExp} contentPattern Content matching pattern
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
   * Count all matches of a `contentPattern` in `source(s)`
   * with file names matching of `pathPattern`
   *
   * @example
   * const searcher = new RegexSearcher();
   * const jsFile = /^(?!.*\.test\.js$).*\.js$/;
   * await searcher.countMatches('./', jsFile, /function/g)
   * // returns 10
   *
   * @param {string|string[]} source Source(s) to search for
   * @param {RegExp} pathPattern Path matching pattern
   * @param {RegExp} contentPattern Content matching pattern
   * @return {number} Count of matches
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
   * Checks if there are any matches of a `contentPattern` in `source(s)`
   * with file names matching of `pathPattern`
   *
   * @example
   * const searcher = new RegexSearcher();
   * const jsFile = /^(?!.*\.test\.js$).*\.js$/;
   * await searcher.testMatches('./', jsFile, /function/g)
   * // returns true
   *
   * @param {string|string[]} source Source(s) to search for
   * @param {RegExp} pathPattern Path matching pattern
   * @param {RegExp} contentPattern Content matching pattern
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
