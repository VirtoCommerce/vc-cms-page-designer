;(function() {

  describe('color panel', function() {

    beforeEach(function() {
      browser.get('http://localhost:8080/');
      element(by.css('.pane-cnt .list .list-item[data-name="colors"]')).click();
    });

    it('should have header', function() {
      expect(element(by.css('#colors .pane-head .pane-t')).getText()).toBe('Colors');
    });

    it('should have inner headers', function() {
      var headers = element.all(by.css('#colors .pane-settings.pane-t'));
      expect(headers.get(0).getText()).toBe('General');
      expect(headers.get(1).getText()).toBe('Navigation');
      expect(headers.get(2).getText()).toBe('Drawers');
      expect(headers.get(3).getText()).toBe('Footer');
    });

    it('items should have name', function() {
      var items = element.all(by.css('#colors .pane-name'));
      expect(items.get(0).getText()).toBe('Background');
      expect(items.get(1).getText()).toBe('Headings');
      expect(items.get(2).getText()).toBe('Text');
      expect(items.get(3).getText()).toBe('Links and accents');
      expect(items.get(4).getText()).toBe('Buttons');
      expect(items.get(5).getText()).toBe('Button text');
      expect(items.get(6).getText()).toBe('Sale tags');
      expect(items.get(7).getText()).toBe('Borders and lines');
      expect(items.get(8).getText()).toBe('Background');
      expect(items.get(9).getText()).toBe('Text');
      expect(items.get(10).getText()).toBe('Secondary bar');
      expect(items.get(11).getText()).toBe('Secondary link');
      expect(items.get(12).getText()).toBe('Secondary link active');
      expect(items.get(13).getText()).toBe('Background');
      expect(items.get(14).getText()).toBe('Text');
      expect(items.get(15).getText()).toBe('Background');
      expect(items.get(16).getText()).toBe('Text');
    });

    it('color pickers should have default color', function() {
      var colorPickers = element.all(by.css('#colors .pane-color .bg'));
      expect(colorPickers.get(0).getCssValue('background-color')).toBe('rgba(255, 255, 255, 1)');
      expect(colorPickers.get(1).getCssValue('background-color')).toBe('rgba(0, 0, 0, 1)');
      expect(colorPickers.get(2).getCssValue('background-color')).toBe('rgba(0, 0, 0, 1)');
      expect(colorPickers.get(3).getCssValue('background-color')).toBe('rgba(0, 0, 0, 1)');
      expect(colorPickers.get(4).getCssValue('background-color')).toBe('rgba(0, 0, 0, 1)');
      expect(colorPickers.get(5).getCssValue('background-color')).toBe('rgba(255, 255, 255, 1)');
      expect(colorPickers.get(6).getCssValue('background-color')).toBe('rgba(0, 0, 0, 1)');
      expect(colorPickers.get(7).getCssValue('background-color')).toBe('rgba(236, 239, 241, 1)');
      expect(colorPickers.get(8).getCssValue('background-color')).toBe('rgba(0, 0, 0, 1)');
      expect(colorPickers.get(9).getCssValue('background-color')).toBe('rgba(255, 255, 255, 1)');
      expect(colorPickers.get(10).getCssValue('background-color')).toBe('rgba(0, 0, 0, 1)');
      expect(colorPickers.get(11).getCssValue('background-color')).toBe('rgba(255, 255, 255, 1)');
      expect(colorPickers.get(12).getCssValue('background-color')).toBe('rgba(255, 255, 255, 1)');
      expect(colorPickers.get(13).getCssValue('background-color')).toBe('rgba(246, 246, 246, 1)');
      expect(colorPickers.get(14).getCssValue('background-color')).toBe('rgba(51, 51, 51, 1)');
      expect(colorPickers.get(15).getCssValue('background-color')).toBe('rgba(0, 0, 0, 1)');
      expect(colorPickers.get(16).getCssValue('background-color')).toBe('rgba(255, 255, 255, 1)');
    });

    it('should change color', function() {
      var items = element.all(by.css('#colors .pane-color'));

      items.each(function(elem, i) {
        elem.click();
        var colorPicker = element.all(by.css('.colorpicker')).get(i);
        colorPicker.element(by.css('.colorpicker_rgb_r input')).clear();
        colorPicker.element(by.css('.colorpicker_rgb_g input')).clear();
        colorPicker.element(by.css('.colorpicker_rgb_b input')).clear();
        colorPicker.element(by.css('.colorpicker_rgb_r input')).sendKeys('12');
        colorPicker.element(by.css('.colorpicker_rgb_g input')).sendKeys('12');
        colorPicker.element(by.css('.colorpicker_rgb_b input')).sendKeys('12');

        element(by.css('#colors .pane-head .pane-t')).click();

        expect(elem.element(by.css('.bg')).getCssValue('background-color')).toBe('rgba(12, 12, 12, 1)');
      });
    });

  });

})();
