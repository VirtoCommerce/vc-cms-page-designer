;(function() {

  describe('typography panel', function() {

    beforeEach(function() {
      browser.get('http://localhost:8080/');
      element(by.css('.pane-cnt .list .list-item[data-name="typography"]')).click();
    });

    it('should have header', function() {
      expect(element(by.css('#typography .pane-head .pane-t')).getText()).toBe('Typography');
    });

    it('should have inner headers', function() {
      var headers = element.all(by.css('#typography .pane-settings.pane-t'));
      expect(headers.get(0).getText()).toBe('Headings');
      expect(headers.get(1).getText()).toBe('Body text');
    });

    it('selects should have name', function() {
      var items = element.all(by.css('#typography .pane-settings .form-label:not(.__switch)'));
      expect(items.get(0).getText()).toBe('Font');
      expect(items.get(1).getText()).toBe('Base size');
      expect(items.get(2).getText()).toBe('Navigation and button size');
      expect(items.get(3).getText()).toBe('Letter spacing');
      expect(items.get(4).getText()).toBe('Font');
      expect(items.get(5).getText()).toBe('Base size');
    });

    it('switch should work', function() {
      var switchButton = element(by.css('#typography .pane-settings .switch')).click();
      expect(element(by.css('#typography .pane-settings input[type="checkbox"]')).isSelected()).toBeTruthy();
    });

    it('selects should work', function() {
      var selects = element.all(by.css('#typography .pane-settings select'));

      selects.each(function(select, index) {
        var option = select.$$('option').last();

        select.click();
        option.click();
        expect(select.$('option:checked').getText()).toBe(option.getText());
      });
    });

  });

})();
