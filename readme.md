# Sublime-svgo

A plugin for [Sublime Text](https://www.sublimetext.com/) providing an interface to [SVGO](https://github.com/svg/svgo).

![demo](https://cloud.githubusercontent.com/assets/1800018/24616695/d7ce3a10-18cc-11e7-8398-24e966b62914.gif)

## Install

You can install via with [Package Control](https://packagecontrol.io/) and restart Sublime.

- **Install Package**: Search with `SVGO`.
- **Add Repository**: Put URL `https://github.com/1000ch/Sublime-svgo`.

Also you can install this extension locally by putting symbolic link from `~/Library/Application\ Support/Sublime\ Text/Packages/` to `~/path/to/this/repo` like below.

```bash
$ ln -s ~/workspace/github.com/1000ch/Sublime-svgo ~/Library/Application\ Support/Sublime\ Text/Packages/SVGO
```

### Prerequisite

[SVGO](https://github.com/svg/svgo) requires Node.js as runtime. If you don't have Node.js, I recommend you to install Node.js using version managers like the followings.

- Use [nodenv/nodenv](https://github.com/nodenv/nodenv)
- Use [hokaccha/nodebrew](https://github.com/hokaccha/nodebrew)

## Usage

In a SVG file, open the Command Palette (<kbd>Cmd</kbd> <kbd>Shift</kbd> <kbd>P</kbd>) and choose **Minify SVG** or **Prettify SVG**.

## Config

You can configure following options from Preferences → Package Settings → Svgo → Settings - User.

### indent

Indent size used on prettify.

### plugins

List of SVGO built-in plugins to use (see [SVGO documentation](https://github.com/svg/svgo) for plugin configuration format).

Default: `['default-preset']`

### prefix_id_format

If set, it used in prefixIds plugin to generate ids.

Examples: `"{hash}"`, `"{name}-{hash}"`.

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
