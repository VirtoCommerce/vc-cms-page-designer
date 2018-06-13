;(function() {

  describe('home page panel', function() {

    beforeEach(function() {
      browser.get('http://localhost:8080/');
      element(by.css('.pane-cnt .list .list-item[data-name="home-page"]')).click();
    });

    it('should have title', function() {
      expect(element(by.css('#home-page .pane-head .pane-t')).getText()).toBe('Home page');
    });

    it('should have inner headers', function() {
      var headers = element.all(by.css('#home-page .pane-settings.pane-t'));
      expect(headers.get(0).getText()).toBe('Sections');
    });

    it('selects should work correct', function() {
      var selects = element.all(by.css('#home-page .pane-settings select'));

      selects.each(function(select, index) {
        var option = select.$$('option').last();

        select.click();
        option.click();
        expect(select.$('option:checked').getText()).toBe(option.getText());
      });
    });

  });

})();
