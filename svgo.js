'use strict';

const getStdin = require('get-stdin');
const SVGO = require('svgo');

getStdin()
  .then(data => minify(data))
  .then(data => process.stdout.write(data));

function minify(data) {
  const options = JSON.parse(process.argv[2]);
  const svg = Buffer.isBuffer(data) ? data.toString() : data;

  const svgo = new SVGO({
    js2svg: {
      pretty: options.pretty,
      indent: options.indent
    },
    plugins: [{
      removeTitle: false
    }, {
      removeViewBox: false
    }]
  });

  return svgo.optimize(svg).then(r => Buffer.from(r.data));
}
