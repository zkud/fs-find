const {core} = require('../..');
const {FileMetaInfo} = core;

const path = './test.js';
const stats = {
  size: 123,
  birthtime: '2022',
  mtime: '2023',
  atime: '2024',
};

describe('FileMetaInfo tests', () => {
  test('It returns file\'s path', () => {
    const info = new FileMetaInfo(path, stats);
    expect(info.path).toBe(path);
  });

  test('It returns file\'s size', () => {
    const info = new FileMetaInfo(path, stats);
    expect(info.size).toBe(stats.size);
  });

  test('It returns file\'s times', () => {
    const info = new FileMetaInfo(path, stats);
    expect(info.accessedAt).toBe(stats.atime);
    expect(info.changedAt).toBe(stats.mtime);
    expect(info.createdAt).toBe(stats.birthtime);
  });
});
