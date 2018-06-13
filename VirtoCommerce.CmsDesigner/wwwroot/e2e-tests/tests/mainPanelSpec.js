;(function() {

  describe('main panel', function() {

    beforeEach(function() {
      browser.get('http://localhost:8080/');
    });

    it('should work', function() {
      expect(browser.getTitle()).toEqual('Virto Commerce Platform Style Guide');
    });

    it('should have right text', function() {
      var list = element.all(by.css('.pane-cnt .list .list-item'))
      expect(list.get(0).getText()).toBe("Presets");
      expect(list.get(1).getText()).toBe("Colors");
      expect(list.get(2).getText()).toBe("Typography");
      expect(list.get(3).getText()).toBe("Header");
      expect(list.get(4).getText()).toBe("Home page");
      expect(list.get(5).getText()).toBe("Home page - slideshow");
      expect(list.get(6).getText()).toBe("Home page - featured content");
      expect(list.get(7).getText()).toBe("Home page - featured products");
      expect(list.get(8).getText()).toBe("Home page - newsletter");
      expect(list.get(9).getText()).toBe("Collection page");
      expect(list.get(10).getText()).toBe("Product page");
      expect(list.get(11).getText()).toBe("Cart page");
      expect(list.get(12).getText()).toBe("Social media");
    });

    it('should change pane', function() {
      var mainPane = element.all(by.css('.pane')).first();
      var colorsPane = element.all(by.css('.pane')).last();
      var elem = element(by.css('.list-item[data-name="colors"]')).click();;

      expect(mainPane.getAttribute('class')).toEqual('pane pane-index __disabled');
      expect(colorsPane.getAttribute('class')).toEqual('pane __selected');
    });

  });

})();
