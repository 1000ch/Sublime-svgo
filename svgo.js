'use strict';

const getStdin = require('get-stdin');
const { optimize } = require('svgo');

getStdin()
  .then(data => minify(data))
  .then(data => process.stdout.write(data));

function minify(data) {
  const options = JSON.parse(process.argv[2]);
  const svg = Buffer.isBuffer(data) ? data.toString() : data;
  const plugins = [];

  const defaultOptions = {
    removeTitle: false,
    removeViewBox: false,
  };

  // Add user plugins
  for (const plugin of Object.keys(options.plugins || [])) {
    plugins.push({
      [plugin]: options.plugins[plugin],
    });
  }

  // Set default options
  for (const option of Object.keys(defaultOptions)) {
    if (!plugins.find(plugin => option in plugin)) {
      plugins.push({
        [option]: defaultOptions[option],
      });
    }
  }

  return optimize(svg, {
    js2svg: {
      pretty: options.pretty,
      indent: options.indent
    },
    plugins: plugins,
  }).then(r => Buffer.from(r.data));
}
