'use strict';

const getStdin = require('get-stdin');
const SVGO = require('svgo');

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
  for (const plugin in options.plugins) {
    plugins.push({
      // TODO: support old node version?
      [plugin]: options.plugins[plugin],
    });
  }

  // Set default options
  for (const option in defaultOptions) {
    if (!plugins.find(plugin => option in plugin)) {
      plugins.push({
        // TODO: support old node version?
        [option]: defaultOptions[option],
      });
    }
  }

  const svgo = new SVGO({
    js2svg: {
      pretty: options.pretty,
      indent: options.indent
    },
    plugins: plugins,
  });

  return svgo.optimize(svg).then(r => Buffer.from(r.data));
}
