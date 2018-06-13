exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    '../tests/mainPanelSpec.js',
    '../tests/colorsSpec.js',
    '../tests/typographySpec.js',
    '../tests/headerSpec.js',
    '../tests/homePageSpec.js',
    '../tests/homePageSlideshowSpec.js',
    '../tests/collectionPageSpec.js',
    '../tests/productPageSpec.js',
    '../tests/cartPageSpec.js',
    '../tests/socialMediaSpec.js'
  ]
};
