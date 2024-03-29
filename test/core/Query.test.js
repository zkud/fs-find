const {core} = require('../..');
const {Query} = core;

describe('Query tests', () => {
  describe('With default args', () => {
    test('It constructs a valid query', () => {
      const query = new Query()
          .from('./src/')
          .filterBy(({path}) => path.endsWith('.js'))
          .mapAs((content) => content.match(/class/g))
          .reduceAs((a, b) => a.concat(b), []);

      expect(query.isValid()).toBeTruthy();
      expect(query.roots).toStrictEqual(['./src/']);
    });
  });

  describe('With array in .from args', () => {
    test('It constructs a valid query', () => {
      const query = new Query()
          .from(['./src/'])
          .filterBy(({path}) => path.endsWith('.js'))
          .mapAs((content) => content.match(/class/g))
          .reduceAs((a, b) => a.concat(b), []);

      expect(query.isValid()).toBeTruthy();
      expect(query.requiresReduce()).toBeTruthy();
      expect(query.roots).toStrictEqual(['./src/']);
    });
  });
});
