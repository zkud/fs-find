const {FSSearcher, Query} = require('..');

let searcher;

describe('FSSearcher tests', () => {
  beforeEach(() => {
    searcher = new FSSearcher();
  });

  describe('With correct query', () => {
    test('It searches', async () => {
      const query = new Query()
          .from('./src/')
          .filterBy(({name}) => name.endsWith('.js'))
          .mapAs((content) => content.match(/class/g));
      console.log(`${query.isValid()}`);
      const results = await searcher.search(query);
      console.log(results);
    });
  });

  describe('With reduce query', () => {
    test('It searches', async () => {
      const query = new Query()
          .from('./src/')
          .filterBy(({name}) => name.endsWith('.js'))
          .mapAs((content) => content.match(/class/g))
          .reduceAs((a, b) => a.concat(b), []);
      console.log(`${query.isValid()}`);
      const results = await searcher.search(query);
      console.log(results);
    });
  });
});
