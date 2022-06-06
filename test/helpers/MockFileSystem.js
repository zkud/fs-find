const {FileSystem, Entry} = require('../../').core;

const mockFSStructure = {
  './src/': [
    new Entry('./src/subdir1/', false),
    new Entry('./src/subdir2/', false),
    new Entry('./src/test.js', true),
  ],
  './src/subdir1/': [
    new Entry('./src/subdir1/test.js', true),
    new Entry('./src/subdir1/test1.js', true),
  ],
  './src/subdir2/': [
    new Entry('./src/subdir2/test.js', true),
    new Entry('./src/subdir2/test1.js', true),
    new Entry('./src/subdir2/test2.js', true),
  ],
  './src/test.js': 'class Test {} module.exports = Test;',
  './src/subdir1/test.js': 'class Test {} module.exports = Test;',
  './src/subdir1/test1.js': 'class Test1 {} module.exports = Test1;',
  './src/subdir2/test.js': 'class Test {} module.exports = Test;',
  './src/subdir2/test1.js': 'class Test1 {} module.exports = Test1;',
  './src/subdir2/test2.js': 'class Test2 {} module.exports = Test2;',
};

/**
 * Mocks core's FileSystem
 */
class MockFileSystem extends FileSystem {
  #structure;

  /**
   * @param {object} structure
   */
  constructor(structure=mockFSStructure) {
    super();
    this.#structure = structure;
  }

  /**
   * @override
   */
  getDirectoryEntries(path) {
    return this.#structure[path];
  }

  /**
   * @override
   */
  readFile(path) {
    return this.#structure[path];
  }
}

module.exports = MockFileSystem;
