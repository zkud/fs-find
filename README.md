# fs-find
Flexible search of file content

[![Hits-of-Code](https://hitsofcode.com/github/zkud/fs-find?branch=main)](https://hitsofcode.com/github/zkud/fs-find/view?branch=main)

```js
const {Searcher, Query} = require('@zkud/fs-find').core;

const searcher = new Searcher();
const results = await searcher.search(
    new Query()
        .from('./src/')
        .filterBy(({path}) => path.endsWith('.js'))
        .mapAs((content) => content.match(/class/g))
        .reduceAs((a, b) => a.concat(b), []),
);

// -> ['class', 'class', ...]
console.log(results);
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 16.* or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install @zkud/fs-find
```

## Features

  * Performant cached FILTER-MAP-REDUCE read-only queries to a file system
  * Super-high test coverage
  * High flexibility to use your own file systems / specific searches

## Docs & Community

  * [Repo](https://github.com/zkud/fs-find)
  * Visit the [Wiki](https://github.com/zkud/fs-find/wiki)

## Security Issues

If you discover a security vulnerability, please see [Security Policies and Procedures](Security.md).

## License

  [MIT](LICENSE)
