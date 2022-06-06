const {FileSystem, Entry} = require('../..').core;
const fs = require('fs').promises;

jest.mock('fs', () => ({
  promises: {
    readdir: () => [
      {
        name: 'file.js',
        isFile() {
          return true;
        },
        isDirectory() {
          return false;
        },
      },
    ],
    readFile: jest.fn(() => 'content'),
  },
}));

describe('FileSystem tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('On getDirectoryEntries it gets entries', async () => {
    const system = new FileSystem();
    const entries = await system.getDirectoryEntries('./test/');
    expect(entries).toStrictEqual([new Entry('./test/file.js', true)]);
  });

  test('On readFile it returns file\'s content', async () => {
    const system = new FileSystem();
    const result = await system.readFile('./test.js');
    expect(result).toBe('content');
  });

  test('On second readFile it uses cache', async () => {
    const system = new FileSystem();

    await system.readFile('./test.js');
    const result = await system.readFile('./test.js');

    expect(fs.readFile).toBeCalledTimes(1);
    expect(result).toBe('content');
  });
});
