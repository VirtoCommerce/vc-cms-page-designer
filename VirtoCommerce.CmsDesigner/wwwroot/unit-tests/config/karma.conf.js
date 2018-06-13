module.exports = function(config) {
  config.set({
    basePath: '../../',
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'editor/main.js',
      'editor/services/defaultSchema.js',
      'editor/services/presets.js',
      'editor/services/modelBuilder.js',
      'editor/services/stack.js',
      'editor/controllers/editorCtrl.js',
      'unit-tests/tests/editorCtrlSpec.js',
      'unit-tests/tests/modelBuilderSpec.js',
      'unit-tests/tests/undoSpec.js'
    ],
    port: 9876,
    autoWatch: true,
    browsers: ['Chrome'],
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine'
    ],
    singleRun: false
  });
};
