;(function() {

  angular.module('theme-editor')
    .directive('editorSetActiveSubpane', setActiveSubpane);

  function setActiveSubpane() {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        $(elem).click(function() {
          var type = attrs.name;
          var rootElem = $(elem).closest('.pane-section');
          var rootPaneElem = $(elem).closest('.pane-root');

          $('.subpane', rootElem).css({ 'display': 'block' });
          $('.main-head', rootElem).css({ 'display': 'none' });
          $('.main-pressets-list', rootElem).css({ 'display': 'none' });
          $('.pane-footer', rootElem).css({ 'display': 'none' });

          //$('.pane-section', rootElem).addClass('__selected');
          //$('.sidebar-main .pane:first-child').addClass('__disabled');
          //$('.pane-section').removeClass('__selected');
          //$('.pane-section#' + type).addClass('__selected');
        });
      }
    };
  }

})();
