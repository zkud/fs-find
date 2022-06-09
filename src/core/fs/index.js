const Entry = require('./Entry');
const FileSystem = require('./FileSystem');
const cache = require('./cache');

module.exports = {
  Entry,
  FileSystem,
  ...cache,
};
