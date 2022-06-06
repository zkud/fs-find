const {Searcher, Query, SearchError} = require('../..').core;
const {MockFileSystem} = require('../helpers');

let searcher;

describe('Searcher tests', () => {
  beforeEach(() => {
    searcher = new Searcher(new MockFileSystem());
  });

  describe('With a simple correct query', () => {
    test('It searches', async () => {
      const results = await searcher.search(
          new Query()
              .from('./src/')
              .filterBy(({path}) => path.endsWith('.js'))
              .mapAs((content) => content.match(/class/g)),
      );

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

  describe('With an invalid query', () => {
    test('It throws error', async () => {
      expect(async () => {
        await searcher.search(
            new Query()
                .filterBy(({path}) => path.endsWith('.js'))
                .mapAs((content) => content.match(/class/g)),
        );
      }).rejects.toThrow(new SearchError('Invalid query'));
    });
  });

  describe('With a reduce query', () => {
    test('It searches', async () => {
      const results = await searcher.search(
          new Query()
              .from('./src/')
              .filterBy(({path}) => path.endsWith('.js'))
              .mapAs((content) => content.match(/class/g))
              .reduceAs((a, b) => a.concat(b), []),
      );

      expect(results).toStrictEqual([
        'class',
        'class',
        'class',
        'class',
        'class',
        'class',
      ]);
    });
  });
});
