;(function() {
  'use strict';

  describe('theme-editor controller', function() {
    var ctrl, scope, httpBackend, settings, presetsData, modelBuilderService, stackService;

    beforeEach(module("theme-editor"));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, defaultSchema, presets, modelBuilder, stack) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      settings = defaultSchema;
      presetsData = presets;
      modelBuilderService = modelBuilder;
      stackService = stack;

      ctrl = $controller('EditorCtrl', {
        $scope: scope,
        defaultSchema: settings,
        presets: presetsData,
        modelBuilder: modelBuilderService,
        stack: stackService
      });
    }));

    it('should replace spaces in pane name', function() {
      expect(ctrl.convertName("home la la")).toBe("home-la-la");
    });

  });

})();
