;(function() {

  describe('header panel', function() {

    beforeEach(function() {
      browser.get('http://localhost:8080/');
      element(by.css('.pane-cnt .list .list-item[data-name="header"]')).click();
    });

    it('should have header', function() {
      expect(element(by.css('#header .pane-head .pane-t')).getText()).toBe('Header');
    });

    it('should have inner headers', function() {
      var headers = element.all(by.css('#header .pane-settings.pane-t'));
      expect(headers.get(0).getText()).toBe('Logo');
      expect(headers.get(1).getText()).toBe('Favicon');
    });

    it('switches should work correct', function() {
      var switchButtons = element.all(by.css('#header .pane-settings .switch')).click();

      switchButtons.each(function(switchButton, i) {
        expect(element.all(by.css('#header .pane-settings input[type="checkbox"]')).get(i).isSelected()).toBeTruthy();
      });
    });

    it('switches should have labels', function() {
      var switchLabels = element.all(by.css('#header .pane-settings .pane-name'));
      expect(switchLabels.get(0).getText()).toBe('Use custom logo');
      expect(switchLabels.get(1).getText()).toBe('Use custom icon');
    });

    it('text input should work correct', function() {
      var input = element(by.css('#header .pane-settings input[type="text"]'));
      input.clear();
      input.sendKeys('12345');
      expect(input.getAttribute('value')).toBe('12345');
    });

    it('info should have correct text', function() {
      var info = element.all(by.css('#header .pane-settings .form-help'));
      expect(info.get(0).getText()).toBe('Not shown on home page. To add a logo to home page, look under Home page - slideshow.');
      expect(info.get(1).getText()).toBe('450 x 200px max');
      expect(info.get(2).getText()).toBe('32 x 32px .png');
    });

    it('fileupload should work correct', function() {
      var inputs = element.all(by.css('#header .pane-settings input[type="file"]'));
      var imgViews = element.all(by.css('#header .pane-settings .form-img img'));
      var imgLabels = element.all(by.css('#header .pane-settings .form-img .name'));

      inputs.each(function(input, i) {
        input.sendKeys("/Users/Marchello/Documents/xVz0-wr0_KQ.jpg");
        expect(imgLabels.get(i).getText()).toBe('xVz0-wr0_KQ.jpg');
      });
    });

  });

})();
