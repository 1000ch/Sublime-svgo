# Sublime-svgo

A plugin for [Sublime Text](https://www.sublimetext.com/) providing an interface to [SVGO](https://github.com/svg/svgo).

## Install

You can install via with [Package Control](https://packagecontrol.io/) and restart Sublime.

- **Install Package**: Search with `SVGO`.
- **Add Repository**: Put URL `https://github.com/1000ch/Sublime-svgo`.

![demo](https://cloud.githubusercontent.com/assets/1800018/24616695/d7ce3a10-18cc-11e7-8398-24e966b62914.gif)

### Prerequisite

[SVGO](https://github.com/svg/svgo) requires Node.js as runtime. If you don't have Node.js, install via followings.

- [Download installer](https://nodejs.org/)
- Use [nodenv/nodenv](https://github.com/nodenv/nodenv)
- Use [hokaccha/nodebrew](https://github.com/hokaccha/nodebrew)

## Usage

In a SVG file, open the Command Palette (<kbd>Cmd</kbd> <kbd>Shift</kbd> <kbd>P</kbd>) and choose **Minify SVG** or **Prettify SVG**.

## Config

You can configure following options from Preferences → Package Settings → Svgo → Settings - User.

### indent

Indent size used on prettify.

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
