;(function() {

  describe('home page panel', function() {

    beforeEach(function() {
      browser.get('http://localhost:8080/');
      element(by.css('.pane-cnt .list .list-item[data-name="home-page---slideshow"]')).click();
    });

    it('should have title', function() {
      expect(element(by.css('#home-page---slideshow .pane-head .pane-t')).getText()).toBe('Home page - slideshow');
    });

    it('should have inner headers', function() {
      var headers = element.all(by.css('#home-page---slideshow .pane-settings.pane-t'));
      expect(headers.get(0).getText()).toBe('Logo');
      expect(headers.get(1).getText()).toBe('Images');
      expect(headers.get(2).getText()).toBe('Overlay');
    });

    it('should change color', function() {
      var items = element.all(by.css('#home-page---slideshow .pane-color'));

      var colorPickersOnPrevPages = 17;

      items.each(function(elem, i) {
        elem.click();
        var colorPicker = element.all(by.css('.colorpicker')).get(colorPickersOnPrevPages + i);
        colorPicker.element(by.css('.colorpicker_rgb_r input')).clear();
        colorPicker.element(by.css('.colorpicker_rgb_g input')).clear();
        colorPicker.element(by.css('.colorpicker_rgb_b input')).clear();
        colorPicker.element(by.css('.colorpicker_rgb_r input')).sendKeys('12');
        colorPicker.element(by.css('.colorpicker_rgb_g input')).sendKeys('12');
        colorPicker.element(by.css('.colorpicker_rgb_b input')).sendKeys('12');

        element(by.css('#home-page---slideshow .pane-head .pane-t')).click();

        expect(elem.element(by.css('.bg')).getCssValue('background-color')).toBe('rgba(12, 12, 12, 1)');
      });
    });

    it('selects should work', function() {
      var selects = element.all(by.css('#home-page---slideshow .pane-settings select'));

      selects.each(function(select, index) {
        var option = select.$$('option').last();

        select.click();
        option.click();
        expect(select.$('option:checked').getText()).toBe(option.getText());
      });
    });

    it('switches should work correct', function() {
      var switchButtons = element.all(by.css('#home-page---slideshow .pane-settings .switch')).click();

      switchButtons.each(function(switchButton, i) {
        expect(element.all(by.css('#home-page---slideshow .pane-settings input[type="checkbox"]')).get(i).isSelected()).toBeTruthy();
      });
    });

    it('fileupload should work correct', function() {
      var inputs = element.all(by.css('#home-page---slideshow .pane-settings input[type="file"]'));
      var imgViews = element.all(by.css('#home-page---slideshow .pane-settings .form-img img'));
      var imgLabels = element.all(by.css('#home-page---slideshow .pane-settings .form-img .name'));

      inputs.each(function(input, i) {
        input.sendKeys("/Users/Marchello/Documents/xVz0-wr0_KQ.jpg");
        expect(imgLabels.get(i).getText()).toBe('xVz0-wr0_KQ.jpg');
      });
    });

    it('text input should work correct', function() {
      var input = element(by.css('#home-page---slideshow .pane-settings input[type="text"]'));
      input.clear();
      input.sendKeys('12345');
      expect(input.getAttribute('value')).toBe('12345');
    });

  });

})();
