;(function() {

  describe('collection page', function() {

    beforeEach(function() {
      browser.get('http://localhost:8080/');
      element(by.css('.pane-cnt .list .list-item[data-name="collection-page"]')).click();
    });

    it('should have title', function() {
      expect(element(by.css('#collection-page .pane-head .pane-t')).getText()).toBe('Collection page');
    });

    it('should have inner headers', function() {
      var headers = element.all(by.css('#collection-page .pane-settings.pane-t'));
      expect(headers.get(0).getText()).toBe('Appearance');
      expect(headers.get(1).getText()).toBe('Sorting & filtering');
      expect(headers.get(2).getText()).toBe('Pagination');
    });

    it('selects should work', function() {
      var selects = element.all(by.css('#collection-page .pane-settings select'));

      selects.each(function(select, index) {
        var option = select.$$('option').last();

        select.click();
        option.click();
        expect(select.$('option:checked').getText()).toBe(option.getText());
      });
    });

    it('switches should work correct', function() {
      var switchButtons = element.all(by.css('#collection-page .pane-settings .switch')).click();

      switchButtons.each(function(switchButton, i) {
        expect(element.all(by.css('#collection-page .pane-settings input[type="checkbox"]')).get(i).isSelected()).toBeTruthy();
      });
    });

  });

})();
