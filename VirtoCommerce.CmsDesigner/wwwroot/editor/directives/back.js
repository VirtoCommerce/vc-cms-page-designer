;(function() {

  angular.module('theme-editor')
    .directive('editorBack', setActivePane);

  function setActivePane($parse) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        
          $(elem).click(function () {
            var expressionHandler = $parse(attrs.editorBack);
           
            scope.closexx = function () {
                $('.sidebar-main .pane:nth-child(2)').removeClass('__selected');
                $('.sidebar-main .pane:first-child').removeClass('__disabled');

                scope.$on('closePane', function () {
                    $('.sidebar-main .pane:nth-child(2)').removeClass('__selected');
                    $('.sidebar-main .pane:first-child').removeClass('__disabled');
                });
            }

            console.log(attrs.editorBack);

            if (!attrs.editorBack || attrs.editorBack == '')
                scope.closexx();

            expressionHandler(scope);
         });
      }
    };
  }

})();


; (function () {

    angular.module('theme-editor')
        .directive('uiSortable2', setActivePane);

    function setActivePane($parse) {
        console.log(3545555);
        return {
        };
    }

})();
