const {RegexSearcher} = require('../..').regex;
const {MockFileSystem} = require('../helpers');

let searcher;

describe('RegexSearcher tests', () => {
  beforeEach(() => {
    searcher = new RegexSearcher(new MockFileSystem());
  });

  describe('On findMatches', () => {
    test('It searches', async () => {
      const results = await searcher
          .findMatches('./src/', /(.|\s)+[.]js/, /class/g);

      expect(results).toStrictEqual([
        ['class'],
        ['class'],
        ['class'],
        ['class'],
        ['class'],
        ['class'],
      ]);
    });
  });

  describe('On countMatches', () => {
    test('It counts correctly', async () => {
      let count = await searcher
          .countMatches('./src/', /(.|\s)+[.]js/, /class/g);
      expect(count).toStrictEqual(6);

      count = await searcher
          .countMatches('./src/', /(.|\s)+[.]js/, /Test1/g);
      expect(count).toStrictEqual(4);
    });
  });

  describe('On testMatches', () => {
    test('It determinates correctly', async () => {
      const classIsPresent = await searcher
          .testMatches('./src/', /(.|\s)+[.]js/, /class/g);
      const functionIsPresent = await searcher
          .testMatches('./src/', /(.|\s)+[.]js/, /function/g);

      expect(classIsPresent).toBeTruthy();
      expect(functionIsPresent).toBeFalsy();
    });
  });
});
