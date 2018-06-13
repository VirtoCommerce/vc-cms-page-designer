;(function() {

  angular.module('theme-editor')
    .directive('editorSetActivePane', setActivePane);

  function setActivePane() {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        $(elem).click(function() {
          var type = attrs.name;

          $('.sidebar-main .pane:nth-child(2)').addClass('__selected');
          $('.sidebar-main .pane:first-child').addClass('__disabled');
          $('.pane-section').removeClass('__selected');

//          console.log(attrs.name);

          if (type) {
              $('.pane-section#' + type).addClass('__selected');
              $('#' + type + ' .pane-section').addClass('__selected');
          }
          else {
              $('.pane-section:last-child').addClass('__selected');
          }
        });
      }
    };
  }

})();
