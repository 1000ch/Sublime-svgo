import sublime
import sublime_plugin
import json
from os.path import dirname, realpath, join

try:
    # Python 2
    from node_bridge import node_bridge
except:
    from .node_bridge import node_bridge

sublime.Region.totuple = lambda self: (self.a, self.b)
sublime.Region.__iter__ = lambda self: self.totuple().__iter__()

BIN_PATH = join(sublime.packages_path(), dirname(realpath(__file__)), 'svgo.mjs')

def get_setting(view, key):
    settings = view.settings().get('Svgo')

    if settings is None:
        settings = sublime.load_settings('Svgo.sublime-settings')

    return settings.get(key)

class SvgoMinifyCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        region = sublime.Region(0, self.view.size())
        buffer = self.view.substr(region)
        processed = self.minify(buffer)

        if processed:
            self.view.replace(edit, region, processed)

    def minify(self, data):
        try:
            return node_bridge(data, BIN_PATH, [json.dumps({
                'indent': get_setting(self.view, 'indent'),
                'plugins': get_setting(self.view, 'plugins')
            })])
        except Exception as e:
            sublime.error_message('svgo\n%s' % e)

class SvgoPrettifyCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        region = sublime.Region(0, self.view.size())
        buffer = self.view.substr(region)
        processed = self.prettify(buffer)

        if processed:
            self.view.replace(edit, region, processed)

    def prettify(self, data):
        try:
            return node_bridge(data, BIN_PATH, [json.dumps({
                'pretty': True,
                'indent': get_setting(self.view, 'indent'),
                'plugins': get_setting(self.view, 'plugins')
            })])
        except Exception as e:
            sublime.error_message('svgo\n%s' % e)
