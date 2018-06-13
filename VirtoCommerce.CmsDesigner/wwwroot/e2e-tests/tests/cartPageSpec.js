;(function() {

  describe('cart page panel', function() {

    beforeEach(function() {
      browser.get('http://localhost:8080/');
      element(by.css('.pane-cnt .list .list-item[data-name="cart-page"]')).click();
    });

    it('should have title', function() {
      expect(element(by.css('#cart-page .pane-head .pane-t')).getText()).toBe('Cart page');
    });

    it('selects should work', function() {
      var selects = element.all(by.css('#cart-page .pane-settings select'));

      selects.each(function(select, index) {
        var option = select.$$('option').last();

        select.click();
        option.click();
        expect(select.$('option:checked').getText()).toBe(option.getText());
      });
    });

    it('switches should work correct', function() {
      var switchButtons = element.all(by.css('#cart-page .pane-settings .switch')).click();

      switchButtons.each(function(switchButton, i) {
        expect(element.all(by.css('#cart-page .pane-settings input[type="checkbox"]')).get(i).isSelected()).toBeTruthy();
      });
    });
  });

})();
