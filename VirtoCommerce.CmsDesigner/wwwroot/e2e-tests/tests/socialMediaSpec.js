;(function() {

  describe('social media panel', function() {

    beforeEach(function() {
      browser.get('http://localhost:8080/');
      element(by.css('.pane-cnt .list .list-item[data-name="social-media"]')).click();
    });

    it('should have title', function() {
      expect(element(by.css('#social-media .pane-head .pane-t')).getText()).toBe('Social media');
    });

    it('text input should work correct', function() {
      var inputs = element.all(by.css('#social-media .pane-settings input[type="text"]'));
      inputs.each(function(input) {
        input.clear();
        input.sendKeys('12345');
        expect(input.getAttribute('value')).toBe('12345');
      });
    });

    it('switches should work correct', function() {
      var switchButtons = element.all(by.css('#social-media .pane-settings .switch')).click();

      switchButtons.each(function(switchButton, i) {
        expect(element.all(by.css('#social-media .pane-settings input[type="checkbox"]')).get(i).isSelected()).toBeTruthy();
      });
    });
  });

})();
