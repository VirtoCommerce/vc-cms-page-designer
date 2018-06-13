myapp.factory('presets', ['$http', Presets]);

  function Presets($http) {
    var obj = {};

    obj.getPresets = function() {
      return $http.get('settings_data.json');
    }

    obj.removePreset = function(presets, name) {
      delete presets.presets[name];
      if (presets.current === name) {
        for (var key in presets.presets) {
          presets.current = key;
          break;
        }
      }
    }

    return obj;
  }
