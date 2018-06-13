myapp.factory('modelBuilder', ModelBuilder);

  function ModelBuilder() {
    var obj = {};

    obj.modelFromSchema = function(schema, model) {
      angular.forEach(schema, function(value) {
        angular.forEach(value.settings, function(setting) {
          if (setting.id !== undefined) {
            if (setting.default !== undefined) {
              model[setting.id] = setting.default;
            } else {
              if (setting.type === "select") {
                model[setting.id] = setting.options[0].value;
              } else if (setting.type === "checkbox") {
                model[setting.id] = false;
              } else {
                model[setting.id] = undefined;
              }
            }

          }
        });
      });
      return model;
    };

    obj.updateModelFromPresets = function(presets, model) {
      var current = presets.current;
      angular.forEach(presets.presets[current], function(value, key) {
        model[key] = value;
      });
      return model;
    };

    return obj;
  }
