;(function() {

  angular.module('theme-editor')
      .directive('editorBackSubpaneList', setEditorBackSubpaneList);

  function setEditorBackSubpaneList($parse) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {

          var closexxx = function () {
              var rootElem = $(elem).closest('.pane-root');

              var paneListElem = $('.pane-root>.subpane-list');

              $(paneListElem).detach().appendTo(paneListElem[0].parentElem);

              

              $(paneListElem).css({ 'display': 'none' });
              $('.main-head').css({ 'display': 'flex' });
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
