'use strict';

const path = require('path');
const execa = require('execa');
const getStdin = require('get-stdin');

const unix = path.normalize(path.join(__dirname, 'node_modules', '.bin', 'svgo'));
const win = path.normalize(path.join(__dirname, 'node_modules', '.bin', 'svgo.cmd'));
const SVGO_BIN = require('os').type() === 'Windows_NT' ? win : unix;

getStdin()
  .then(data => svgo(data))
  .then(data => process.stdout.write(data));

function svgo(data) {
  const options = JSON.parse(process.argv[2]);
  const args = [
    '--string', data,
    '--indent', options.indent,
    '--output', '-'
  ];

  if (options.pretty) {
    args.push('--pretty');
  }

  return execa.stdout(SVGO_BIN, args, {
    encoding: null
  });
}
