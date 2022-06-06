const {FileSystem, Entry} = require('../..').core;

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
    readFile: () => 'content',
  },
}));

describe('FileSystem tests', () => {
  test('On getDirectoryEntries it gets entries', async () => {
    const fs = new FileSystem();
    const entries = await fs.getDirectoryEntries('./test/');
    expect(entries).toStrictEqual([new Entry('./test/file.js', true)]);
  });

  test('On readFile it returns file\'s content', async () => {
    const fs = new FileSystem();
    const result = await fs.readFile('./test.js');
    expect(result).toBe('content');
  });
});
