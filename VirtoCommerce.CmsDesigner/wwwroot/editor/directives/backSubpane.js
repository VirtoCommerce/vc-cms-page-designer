;(function() {

  angular.module('theme-editor')
      .directive('editorBackSubpane', setEditorBackSubpane);

  function setEditorBackSubpane($parse) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {

          var closexxx = function () {
              var rootElem = $(elem).closest('.pane-section-main');
              $('.subpane', rootElem).css({ 'display': 'none' });
              $('.main-head', rootElem).css({ 'display': 'flex' });
              $('.main-pressets-list', rootElem).css({ 'display': 'block' });
              $('.pane-footer', rootElem).css({ 'display': 'block' });
          }
        
          $(elem).click(function () {
              var expressionHandler = $parse(attrs.editorBackSubpane);

            if (!attrs.editorBackSubpane || attrs.editorBackSubpane == '')
                closexxx();

            expressionHandler(scope, { close: closexxx });
         });
      }
    };
  }

})();


; (function () {


})();
