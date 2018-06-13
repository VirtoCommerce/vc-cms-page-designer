;(function() {

  angular.module('theme-editor')
    .directive('editorSetColor', setColor);

  function setColor() {
    return {
      restrict: 'E',
      scope: {
        value: "="
      },
      template: "<div class='bg'></div>",
      link: function(scope, elem, attrs) {
        $(elem).ColorPicker({
          color: scope.value,
          onChange: function (hsb, hex, rgb) {
            scope.$apply(function() {
              scope.value = '#' + hex;
            });
            $(elem).find('div').css('backgroundColor', '#' + hex);
          }
        });

        $(elem).children('.bg').css("background-color", scope.value);

        scope.$on('modelUpdated', function(event, model) {
          var id = attrs.id;
          var color = model[id];

          $(elem).ColorPickerSetColor(color);
          $(elem).children('.bg').css("background-color", color);
        });

      }
    };
  }

})();
