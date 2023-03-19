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

def is_svg_selection(view):
    selected = view.sel()[0]
    if selected.empty():
        region = sublime.Region(0, 4)
    else:
        region = sublime.Region(selected.begin(), selected.begin() + 4)

    return view.substr(region) == '<svg'

def execute_svgo(view, edit, pretty):
    selected = view.sel()[0]
    region = sublime.Region(0, view.size()) if selected.empty() else selected
    buffer = view.substr(region)
    filename = view.file_name()

    try:
        processed = node_bridge(buffer, BIN_PATH, [json.dumps({
            'pretty': pretty,
            'path': filename,
            'prefixIdFormat': get_setting(view, 'prefix_id_format'),
            'indent': get_setting(view, 'indent'),
            'plugins': get_setting(view, 'plugins')
        })])
    except Exception as e:
        processed = False
        sublime.error_message('svgo\n%s' % e)

    if processed:
        view.replace(edit, region, processed)


class SvgoContextMenuCommand(sublime_plugin.TextCommand):
    def is_visible(self):
        return is_svg_selection(self.view)


class SvgoMinifyCommand(sublime_plugin.TextCommand):
    def is_visible(self):
        return is_svg_selection(self.view)

    def run(self, edit):
        execute_svgo(self.view, edit, False)


class SvgoPrettifyCommand(sublime_plugin.TextCommand):
    def is_visible(self):
        return is_svg_selection(self.view)

    def run(self, edit):
        execute_svgo(self.view, edit, True)
