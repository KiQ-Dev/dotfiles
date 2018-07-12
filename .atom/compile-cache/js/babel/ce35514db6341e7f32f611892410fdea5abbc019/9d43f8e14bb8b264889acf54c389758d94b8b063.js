Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

'use babel';

var uniquifySettings = function uniquifySettings(settings) {
  var genName = function genName(name, index) {
    return name + ' - ' + index;
  };
  var newSettings = [];
  settings.forEach(function (setting) {
    var i = 0;
    var testName = setting.name;
    while (newSettings.find(function (ns) {
      return ns.name === testName;
    })) {
      // eslint-disable-line no-loop-func
      testName = genName(setting.name, ++i);
    }
    newSettings.push(_extends({}, setting, { name: testName }));
  });
  return newSettings;
};

var activePath = function activePath() {
  var textEditor = atom.workspace.getActiveTextEditor();
  if (!textEditor || !textEditor.getPath()) {
    /* default to building the first one if no editor is active */
    if (0 === atom.project.getPaths().length) {
      return false;
    }

    return atom.project.getPaths()[0];
  }

  /* otherwise, build the one in the root of the active editor */
  return atom.project.getPaths().sort(function (a, b) {
    return b.length - a.length;
  }).find(function (p) {
    try {
      var realpath = _fs2['default'].realpathSync(p);
      return _fs2['default'].realpathSync(textEditor.getPath()).substr(0, realpath.length) === realpath;
    } catch (err) {
      /* Path no longer available. Possible network volume has gone down */
      return false;
    }
  });
};

var getDefaultSettings = function getDefaultSettings(cwd, setting) {
  return Object.assign({}, setting, {
    env: setting.env || {},
    args: setting.args || [],
    cwd: setting.cwd || cwd,
    sh: undefined === setting.sh ? true : setting.sh,
    errorMatch: setting.errorMatch || ''
  });
};

var replace = function replace(value, targetEnv) {
  if (value === undefined) value = '';

  if (!(typeof value === 'string')) {
    return value;
  }

  var env = Object.assign({}, process.env, targetEnv);
  value = value.replace(/\$(\w+)/g, function (match, name) {
    return name in env ? env[name] : match;
  });

  var editor = atom.workspace.getActiveTextEditor();

  var projectPaths = atom.project.getPaths().map(function (projectPath) {
    try {
      return _fs2['default'].realpathSync(projectPath);
    } catch (e) {/* Do nothing. */}
    return null;
  });

  var projectPath = projectPaths[0];
  if (editor && undefined !== editor.getPath()) {
    (function () {
      var activeFile = _fs2['default'].realpathSync(editor.getPath());
      var activeFilePath = _path2['default'].dirname(activeFile);
      projectPath = projectPaths.find(function (p) {
        return activeFilePath && activeFilePath.startsWith(p);
      });
      value = value.replace(/{FILE_ACTIVE}/g, activeFile);
      value = value.replace(/{FILE_ACTIVE_PATH}/g, activeFilePath);
      value = value.replace(/{FILE_ACTIVE_NAME}/g, _path2['default'].basename(activeFile));
      value = value.replace(/{FILE_ACTIVE_NAME_BASE}/g, _path2['default'].basename(activeFile, _path2['default'].extname(activeFile)));
      value = value.replace(/{SELECTION}/g, editor.getSelectedText());
      var cursorScreenPosition = editor.getCursorScreenPosition();
      value = value.replace(/{FILE_ACTIVE_CURSOR_ROW}/g, cursorScreenPosition.row + 1);
      value = value.replace(/{FILE_ACTIVE_CURSOR_COLUMN}/g, cursorScreenPosition.column + 1);
    })();
  }
  value = value.replace(/{PROJECT_PATH}/g, projectPath);
  if (atom.project.getRepositories[0]) {
    value = value.replace(/{REPO_BRANCH_SHORT}/g, atom.project.getRepositories()[0].getShortHead());
  }

  return value;
};

exports.uniquifySettings = uniquifySettings;
exports.activePath = activePath;
exports.getDefaultSettings = getDefaultSettings;
exports.replace = replace;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3lva290YS8uYXRvbS9wYWNrYWdlcy9idWlsZC9saWIvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBRWUsSUFBSTs7OztvQkFDRixNQUFNOzs7O0FBSHZCLFdBQVcsQ0FBQzs7QUFLWixJQUFNLGdCQUFnQixHQUFHLFNBQW5CLGdCQUFnQixDQUFJLFFBQVEsRUFBSztBQUNyQyxNQUFNLE9BQU8sR0FBRyxTQUFWLE9BQU8sQ0FBSSxJQUFJLEVBQUUsS0FBSztXQUFRLElBQUksV0FBTSxLQUFLO0dBQUUsQ0FBQztBQUN0RCxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDdkIsVUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU8sRUFBSTtBQUMxQixRQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDVixRQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQzVCLFdBQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7YUFBSSxFQUFFLENBQUMsSUFBSSxLQUFLLFFBQVE7S0FBQSxDQUFDLEVBQUU7O0FBQ25ELGNBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3ZDO0FBQ0QsZUFBVyxDQUFDLElBQUksY0FBTSxPQUFPLElBQUUsSUFBSSxFQUFFLFFBQVEsSUFBRyxDQUFDO0dBQ2xELENBQUMsQ0FBQztBQUNILFNBQU8sV0FBVyxDQUFDO0NBQ3BCLENBQUM7O0FBRUYsSUFBTSxVQUFVLEdBQUcsU0FBYixVQUFVLEdBQVM7QUFDdkIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0FBQ3hELE1BQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUU7O0FBRXhDLFFBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFO0FBQ3hDLGFBQU8sS0FBSyxDQUFDO0tBQ2Q7O0FBRUQsV0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ25DOzs7QUFHRCxTQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7V0FBTSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNO0dBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsRUFBSTtBQUM3RSxRQUFJO0FBQ0YsVUFBTSxRQUFRLEdBQUcsZ0JBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLGFBQU8sZ0JBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFFBQVEsQ0FBQztLQUN0RixDQUFDLE9BQU8sR0FBRyxFQUFFOztBQUVaLGFBQU8sS0FBSyxDQUFDO0tBQ2Q7R0FDRixDQUFDLENBQUM7Q0FDSixDQUFDOztBQUVGLElBQU0sa0JBQWtCLEdBQUcsU0FBckIsa0JBQWtCLENBQUksR0FBRyxFQUFFLE9BQU8sRUFBSztBQUMzQyxTQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRTtBQUNoQyxPQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQ3RCLFFBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUU7QUFDeEIsT0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUksR0FBRztBQUN2QixNQUFFLEVBQUUsQUFBQyxTQUFTLEtBQUssT0FBTyxDQUFDLEVBQUUsR0FBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEVBQUU7QUFDbEQsY0FBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRTtHQUNyQyxDQUFDLENBQUM7Q0FDSixDQUFDOztBQUVGLElBQU0sT0FBTyxHQUFHLFNBQVYsT0FBTyxDQUFJLEtBQUssRUFBTyxTQUFTLEVBQUs7TUFBMUIsS0FBSyxnQkFBTCxLQUFLLEdBQUcsRUFBRTs7QUFDekIsTUFBSSxFQUFFLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQSxBQUFDLEVBQUU7QUFDaEMsV0FBTyxLQUFLLENBQUM7R0FDZDs7QUFFRCxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3RELE9BQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxVQUFVLEtBQUssRUFBRSxJQUFJLEVBQUU7QUFDdkQsV0FBTyxJQUFJLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7R0FDeEMsQ0FBQyxDQUFDOztBQUVILE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzs7QUFFcEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBQSxXQUFXLEVBQUk7QUFDOUQsUUFBSTtBQUNGLGFBQU8sZ0JBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ3JDLENBQUMsT0FBTyxDQUFDLEVBQUUsbUJBQXFCO0FBQ2pDLFdBQU8sSUFBSSxDQUFDO0dBQ2IsQ0FBQyxDQUFDOztBQUVILE1BQUksV0FBVyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQyxNQUFJLE1BQU0sSUFBSyxTQUFTLEtBQUssTUFBTSxDQUFDLE9BQU8sRUFBRSxBQUFDLEVBQUU7O0FBQzlDLFVBQU0sVUFBVSxHQUFHLGdCQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUNyRCxVQUFNLGNBQWMsR0FBRyxrQkFBSyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDaEQsaUJBQVcsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztlQUFJLGNBQWMsSUFBSSxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztPQUFBLENBQUMsQ0FBQztBQUNyRixXQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUNwRCxXQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUM3RCxXQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxrQkFBSyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUN4RSxXQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxrQkFBSyxRQUFRLENBQUMsVUFBVSxFQUFFLGtCQUFLLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkcsV0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO0FBQ2hFLFVBQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLHVCQUF1QixFQUFFLENBQUM7QUFDOUQsV0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsMkJBQTJCLEVBQUUsb0JBQW9CLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2pGLFdBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLDhCQUE4QixFQUFFLG9CQUFvQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzs7R0FDeEY7QUFDRCxPQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN0RCxNQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ25DLFNBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztHQUNqRzs7QUFFRCxTQUFPLEtBQUssQ0FBQztDQUNkLENBQUM7O1FBRU8sZ0JBQWdCLEdBQWhCLGdCQUFnQjtRQUFFLFVBQVUsR0FBVixVQUFVO1FBQUUsa0JBQWtCLEdBQWxCLGtCQUFrQjtRQUFFLE9BQU8sR0FBUCxPQUFPIiwiZmlsZSI6Ii9ob21lL3lva290YS8uYXRvbS9wYWNrYWdlcy9idWlsZC9saWIvdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCB1bmlxdWlmeVNldHRpbmdzID0gKHNldHRpbmdzKSA9PiB7XG4gIGNvbnN0IGdlbk5hbWUgPSAobmFtZSwgaW5kZXgpID0+IGAke25hbWV9IC0gJHtpbmRleH1gO1xuICBjb25zdCBuZXdTZXR0aW5ncyA9IFtdO1xuICBzZXR0aW5ncy5mb3JFYWNoKHNldHRpbmcgPT4ge1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgdGVzdE5hbWUgPSBzZXR0aW5nLm5hbWU7XG4gICAgd2hpbGUgKG5ld1NldHRpbmdzLmZpbmQobnMgPT4gbnMubmFtZSA9PT0gdGVzdE5hbWUpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9vcC1mdW5jXG4gICAgICB0ZXN0TmFtZSA9IGdlbk5hbWUoc2V0dGluZy5uYW1lLCArK2kpO1xuICAgIH1cbiAgICBuZXdTZXR0aW5ncy5wdXNoKHsgLi4uc2V0dGluZywgbmFtZTogdGVzdE5hbWUgfSk7XG4gIH0pO1xuICByZXR1cm4gbmV3U2V0dGluZ3M7XG59O1xuXG5jb25zdCBhY3RpdmVQYXRoID0gKCkgPT4ge1xuICBjb25zdCB0ZXh0RWRpdG9yID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpO1xuICBpZiAoIXRleHRFZGl0b3IgfHwgIXRleHRFZGl0b3IuZ2V0UGF0aCgpKSB7XG4gICAgLyogZGVmYXVsdCB0byBidWlsZGluZyB0aGUgZmlyc3Qgb25lIGlmIG5vIGVkaXRvciBpcyBhY3RpdmUgKi9cbiAgICBpZiAoMCA9PT0gYXRvbS5wcm9qZWN0LmdldFBhdGhzKCkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF0b20ucHJvamVjdC5nZXRQYXRocygpWzBdO1xuICB9XG5cbiAgLyogb3RoZXJ3aXNlLCBidWlsZCB0aGUgb25lIGluIHRoZSByb290IG9mIHRoZSBhY3RpdmUgZWRpdG9yICovXG4gIHJldHVybiBhdG9tLnByb2plY3QuZ2V0UGF0aHMoKS5zb3J0KChhLCBiKSA9PiAoYi5sZW5ndGggLSBhLmxlbmd0aCkpLmZpbmQocCA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlYWxwYXRoID0gZnMucmVhbHBhdGhTeW5jKHApO1xuICAgICAgcmV0dXJuIGZzLnJlYWxwYXRoU3luYyh0ZXh0RWRpdG9yLmdldFBhdGgoKSkuc3Vic3RyKDAsIHJlYWxwYXRoLmxlbmd0aCkgPT09IHJlYWxwYXRoO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLyogUGF0aCBubyBsb25nZXIgYXZhaWxhYmxlLiBQb3NzaWJsZSBuZXR3b3JrIHZvbHVtZSBoYXMgZ29uZSBkb3duICovXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IGdldERlZmF1bHRTZXR0aW5ncyA9IChjd2QsIHNldHRpbmcpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHNldHRpbmcsIHtcbiAgICBlbnY6IHNldHRpbmcuZW52IHx8IHt9LFxuICAgIGFyZ3M6IHNldHRpbmcuYXJncyB8fCBbXSxcbiAgICBjd2Q6IHNldHRpbmcuY3dkIHx8IGN3ZCxcbiAgICBzaDogKHVuZGVmaW5lZCA9PT0gc2V0dGluZy5zaCkgPyB0cnVlIDogc2V0dGluZy5zaCxcbiAgICBlcnJvck1hdGNoOiBzZXR0aW5nLmVycm9yTWF0Y2ggfHwgJydcbiAgfSk7XG59O1xuXG5jb25zdCByZXBsYWNlID0gKHZhbHVlID0gJycsIHRhcmdldEVudikgPT4ge1xuICBpZiAoISh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGNvbnN0IGVudiA9IE9iamVjdC5hc3NpZ24oe30sIHByb2Nlc3MuZW52LCB0YXJnZXRFbnYpO1xuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcJChcXHcrKS9nLCBmdW5jdGlvbiAobWF0Y2gsIG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZSBpbiBlbnYgPyBlbnZbbmFtZV0gOiBtYXRjaDtcbiAgfSk7XG5cbiAgY29uc3QgZWRpdG9yID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpO1xuXG4gIGNvbnN0IHByb2plY3RQYXRocyA9IGF0b20ucHJvamVjdC5nZXRQYXRocygpLm1hcChwcm9qZWN0UGF0aCA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmcy5yZWFscGF0aFN5bmMocHJvamVjdFBhdGgpO1xuICAgIH0gY2F0Y2ggKGUpIHsgLyogRG8gbm90aGluZy4gKi8gfVxuICAgIHJldHVybiBudWxsO1xuICB9KTtcblxuICBsZXQgcHJvamVjdFBhdGggPSBwcm9qZWN0UGF0aHNbMF07XG4gIGlmIChlZGl0b3IgJiYgKHVuZGVmaW5lZCAhPT0gZWRpdG9yLmdldFBhdGgoKSkpIHtcbiAgICBjb25zdCBhY3RpdmVGaWxlID0gZnMucmVhbHBhdGhTeW5jKGVkaXRvci5nZXRQYXRoKCkpO1xuICAgIGNvbnN0IGFjdGl2ZUZpbGVQYXRoID0gcGF0aC5kaXJuYW1lKGFjdGl2ZUZpbGUpO1xuICAgIHByb2plY3RQYXRoID0gcHJvamVjdFBhdGhzLmZpbmQocCA9PiBhY3RpdmVGaWxlUGF0aCAmJiBhY3RpdmVGaWxlUGF0aC5zdGFydHNXaXRoKHApKTtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL3tGSUxFX0FDVElWRX0vZywgYWN0aXZlRmlsZSk7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC97RklMRV9BQ1RJVkVfUEFUSH0vZywgYWN0aXZlRmlsZVBhdGgpO1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgve0ZJTEVfQUNUSVZFX05BTUV9L2csIHBhdGguYmFzZW5hbWUoYWN0aXZlRmlsZSkpO1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgve0ZJTEVfQUNUSVZFX05BTUVfQkFTRX0vZywgcGF0aC5iYXNlbmFtZShhY3RpdmVGaWxlLCBwYXRoLmV4dG5hbWUoYWN0aXZlRmlsZSkpKTtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL3tTRUxFQ1RJT059L2csIGVkaXRvci5nZXRTZWxlY3RlZFRleHQoKSk7XG4gICAgY29uc3QgY3Vyc29yU2NyZWVuUG9zaXRpb24gPSBlZGl0b3IuZ2V0Q3Vyc29yU2NyZWVuUG9zaXRpb24oKTtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL3tGSUxFX0FDVElWRV9DVVJTT1JfUk9XfS9nLCBjdXJzb3JTY3JlZW5Qb3NpdGlvbi5yb3cgKyAxKTtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL3tGSUxFX0FDVElWRV9DVVJTT1JfQ09MVU1OfS9nLCBjdXJzb3JTY3JlZW5Qb3NpdGlvbi5jb2x1bW4gKyAxKTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL3tQUk9KRUNUX1BBVEh9L2csIHByb2plY3RQYXRoKTtcbiAgaWYgKGF0b20ucHJvamVjdC5nZXRSZXBvc2l0b3JpZXNbMF0pIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL3tSRVBPX0JSQU5DSF9TSE9SVH0vZywgYXRvbS5wcm9qZWN0LmdldFJlcG9zaXRvcmllcygpWzBdLmdldFNob3J0SGVhZCgpKTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbmV4cG9ydCB7IHVuaXF1aWZ5U2V0dGluZ3MsIGFjdGl2ZVBhdGgsIGdldERlZmF1bHRTZXR0aW5ncywgcmVwbGFjZSB9O1xuIl19