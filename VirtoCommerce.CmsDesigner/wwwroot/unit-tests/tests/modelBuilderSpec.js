;(function() {
  'use strict';

  describe('theme-editor model builder service', function() {
    var service;

    var schema, presets;

    schema = [{
      "name": "...",
      "settings": [{
        "type": "color",
        "id": "color_body_bg",
        "label": "Background",
        "default": "#ffffff"
      }, {
        "type": "color",
        "id": "color_body_text",
        "label": "Text"
      }]
    }];

    presets = {
      "current": "Blue",
      "presets": {
        "Blue": {
          "color_accent": "#ffea00",
          "color_body_bg": "#fff",
          "color_body_text": "#585858",
          "type_accent_family": "Google_Dosis_600_sans"
        }
      }
    };

    beforeEach(module("theme-editor"));

    beforeEach(inject(function(modelBuilder) {
      service = modelBuilder;
    }));

    it('should parse schema', function() {
      var model = {},
      expectedModel = {
        "color_body_bg": "#ffffff",
        "color_body_text": undefined
      };

      model = service.modelFromSchema(schema, model);

      expect(model).toEqual(expectedModel);
    });

    it('should update model by preset', function() {
      var model = {},
      expectedModel = {
        "color_accent": "#ffea00",
        "color_body_bg": "#fff",
        "color_body_text": "#585858",
        "type_accent_family": "Google_Dosis_600_sans"
      };

      model = service.modelFromSchema(schema, model);
      model = service.updateModelFromPresets(presets, model);

      expect(model).toEqual(expectedModel);
    });

  });

})();
