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

  const defaultOptions = [
    {
      name: "removeTitle",
      active: false
    },
    {
      name: "removeViewBox",
      active: false
    }
  ];

  // Add user plugins
  for (const plugin of Object.keys(options.plugins || [])) {
    plugins.push({
      name: options.plugins[plugin].name,
      params: options.plugins[plugin].params
    });
  }

  // Set default options
  for (const option of Object.keys(defaultOptions)) {
    if (!plugins.find(plugin => option in plugin)) {
      plugins.push({
        name: defaultOptions[option].name,
        params: defaultOptions[option].params
      });
    }
  }

  let r = optimize(svg, {
    js2svg: {
      pretty: options.pretty,
      indent: options.indent
    },
    plugins: plugins,
  });

  return Buffer.from(r.data);
}
