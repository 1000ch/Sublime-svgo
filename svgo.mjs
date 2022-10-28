import {Buffer} from 'node:buffer';
import getStdin from 'get-stdin';
import {optimize} from 'svgo';

getStdin()
  .then(data => minify(data))
  .then(data => process.stdout.write(data));

function minify(data) {
  const options = JSON.parse(process.argv[2]);
  const svg = Buffer.isBuffer(data) ? data.toString() : data;
  const plugins = ['preset-default'];

  // Add user plugins
  for (const plugin of Object.keys(options.plugins || [])) {
    plugins.push({
      [plugin]: options.plugins[plugin],
    });
  }

  return optimize(svg, {
    js2svg: {
      pretty: options.pretty,
      indent: options.indent
    },
    plugins,
  }).data;
}
