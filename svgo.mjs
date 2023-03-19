import {Buffer} from 'node:buffer';
import getStdin from 'get-stdin';
import {optimize} from 'svgo';
import path from 'path';

getStdin()
  .then(data => minify(data))
  .then(data => process.stdout.write(data));

function hashCode(str) {
  var hash = 0, i, chr;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
}

function createPrefixFormatter(format) {
  return (node, info) => {
    const hash = hashCode(info.path).toString(36);
    const name = path.basename(info.path, '.svg');
    return format.replace(/\{name\}/g, name).replace(/\{hash\}/g, hash);
  };
}

function minify(data) {
  const options = JSON.parse(process.argv[2]);
  const svg = Buffer.isBuffer(data) ? data.toString() : data;
  let plugins = options.plugins || ['preset-default'];

  if (options.prefixIdFormat) {
    let pluginParams = {};
    let prefixIdsPlugin = plugins.find(p => p.name === 'prefixIds');
    if (prefixIdsPlugin) {
      pluginParams = prefixIdsPlugin.params || {};
    }

    plugins = plugins.filter(p => p !== 'prefixIds' && p.name !== 'prefixIds');

    plugins.push({
      name: 'prefixIds',
      params: {
        delim: '_',
        prefix: createPrefixFormatter(options.prefixIdFormat),
        ...pluginParams
      }
    });
  }

  return optimize(svg, {
    path: options.path,
    js2svg: {
      pretty: options.pretty,
      indent: options.indent
    },
    plugins,
  }).data;
}
