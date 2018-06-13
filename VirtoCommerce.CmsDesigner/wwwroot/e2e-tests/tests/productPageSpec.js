;(function() {

  describe('product page', function() {

    beforeEach(function() {
      browser.get('http://localhost:8080/');
      element(by.css('.pane-cnt .list .list-item[data-name="product-page"]')).click();
    });

    it('should have title', function() {
      expect(element(by.css('#product-page .pane-head .pane-t')).getText()).toBe('Product page');
    });

    it('switches should work correct', function() {
      var switchButtons = element.all(by.css('#product-page .pane-settings .switch')).click();

      switchButtons.each(function(switchButton, i) {
        expect(element.all(by.css('#product-page .pane-settings input[type="checkbox"]')).get(i).isSelected()).toBeTruthy();
      });
    });

  });

})();
