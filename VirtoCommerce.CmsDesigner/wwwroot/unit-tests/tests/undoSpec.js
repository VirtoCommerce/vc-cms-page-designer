;(function() {
  'use strict';

  describe('theme-editor stack service', function() {
    var service;

    beforeEach(module("theme-editor"));

    beforeEach(inject(function(stack) {
      service = stack;
    }));

    it('should push items', function() {
      var item1 = {
        "color_accent": "#ffea00",
        "color_body_bg": "#fff",
        "color_body_text": "#585858"
      };
      var item2 = {
        "color_accent": "#ff00",
        "color_body_bg": "#fff000",
        "color_body_text": "#585858"
      }

      service.push(item1);
      service.push(item2);

      var currentItem = service.get();

      expect(currentItem).toEqual(item2);
    });

    it('should pop items', function() {
      var item1 = {
        "color_accent": "#ffea00",
        "color_body_bg": "#fff",
        "color_body_text": "#585858"
      };
      var item2 = {
        "color_accent": "#ff00",
        "color_body_bg": "#fff000",
        "color_body_text": "#585858"
      }

      service.push(item1);
      service.push(item2);
      service.pop();

      var currentItem = service.get();

      expect(currentItem).toEqual(item1);
    });

    it('should have length', function() {
      var item1 = {
        "color_accent": "#ffea00",
        "color_body_bg": "#fff",
        "color_body_text": "#585858"
      };
      var item2 = {
        "color_accent": "#ff00",
        "color_body_bg": "#fff000",
        "color_body_text": "#585858"
      }

      service.push(item1);
      service.push(item2);

      var currentLength = service.length();
      expect(currentLength).toEqual(2);

      service.pop();
      currentLength = service.length();
      expect(currentLength).toEqual(1);
    });

  });

})();
