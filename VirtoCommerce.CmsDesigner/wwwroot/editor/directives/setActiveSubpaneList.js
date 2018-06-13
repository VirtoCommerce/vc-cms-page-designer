;(function() {

  angular.module('theme-editor')
    .directive('editorSetActiveSubpaneList', setActiveSubpaneList);

  function setActiveSubpaneList() {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        $(elem).click(function() {
          var type = attrs.name;
          var rootPaneElem = $(elem).closest('.pane-root');

          var rootElem = $(elem).closest('.pane-section');

          var subpane = $('.subpane-list', rootElem);

          var parentElemForSubpane = $(subpane).parent()[0];

          $(subpane).detach().appendTo(rootPaneElem);

          subpane[0].parentElem = parentElemForSubpane;

          // Show selected pane
          $(subpane).css({ 'display': 'block' });

          // Hide previous pane
          $('.main-head').css({ 'display': 'none' });
          $('.main-pressets-list', rootPaneElem).css({ 'display': 'none' });
          $('.pane-footer', rootPaneElem).css({ 'display': 'none' });
          
          
          //$('.sidebar-main .pane:nth-child(2)').addClass('__selected');
          //$('.sidebar-main .pane:first-child').addClass('__disabled');
          //$('.pane-section').removeClass('__selected');
          //$('.pane-section#' + type).addClass('__selected');
        });
      }
    };
  }

})();
