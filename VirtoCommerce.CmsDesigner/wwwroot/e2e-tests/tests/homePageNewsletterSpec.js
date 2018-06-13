;(function() {

  describe('home page - newsletter', function() {

    beforeEach(function() {
      browser.get('http://localhost:8080/');
      element(by.css('.pane-cnt .list .list-item[data-name="home-page---newsletter"]')).click();
    });

    it('should have title', function() {
      expect(element(by.css('#home-page---newsletter .pane-head .pane-t')).getText()).toBe('Home page - newsletter');
    });

    it('text input should work correct', function() {
      var input = element(by.css('#home-page---newsletter .pane-settings input[type="text"]'));
      input.clear();
      input.sendKeys('12345');
      expect(input.getAttribute('value')).toBe('12345');
    });

  });

})();
