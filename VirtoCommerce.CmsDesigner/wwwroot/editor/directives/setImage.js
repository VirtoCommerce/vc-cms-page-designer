var _maxFileSize = 5 * 1024 * 1024;

; (function () {

    angular.module('theme-editor')
        .directive('editorSetImage', ['imageService', setImage]);

    function setImage(imageService) {
        return {
            restrict: 'AE',
            scope: {
                model: "="
            },
            template:
            "<div class='form-file'>\
          <input type='file'>\
          <button class='btn form-load-image'><i class='fa fa-picture-o'></i></button>\
        </div>",
            link: function (scope, elem, attrs) {

                $(elem).children('.form-file').children('.btn').bind('click', function () {
                    var input = $(this).parent().find('input[type="file"]');
                    input.val('');
                    input.trigger('click');
                });
                $(elem).parent().children('button.upload-file').bind('click', function () {
                    var input = $(this).parent().find('input[type="file"]');
                    input.val('');
                    input.trigger('click');
                });
                $(elem).parent().children('button.remove-file').bind('click', function () {
                    scope.$apply(function () {
                        scope.model.url = '';
                        scope.model.name = name;
                    });
                    $(this).parent().find('.form-file>button').css({backgroundImage: ''});
                });

                $(elem).children(".form-file").children("input").change(function () {
                    var self = this;

                    if (self.files && self.files[0]) {
                        if (self.files[0].size > _maxFileSize) {
                            $.confirm({
                                title: 'Warning',
                                content: 'Sorry, the file is too big, it should be at max 5MB',
                                buttons: { ok: { text: 'ok' } }
                            });
                        }
                        else if (self.files[0].type === 'image/jpeg'
                            || self.files[0].type === 'image/svg'
                            || self.files[0].type === 'image/gif'
                            || self.files[0].type === 'image/png'
                            || self.files[0].type === 'image/jpg') {

                            var reader = new FileReader();
                            var $self = $(self).parents('.pane-settings');
                            reader.onload = function (e) {
                                var id = attrs.id;
                                var name = self.files[0].name;
                                var file = imageService.upload(name, self.files[0]);
                                //var file = imageService.upload(name, e.target.result);

                                scope.$apply(function () {
                                    scope.model.url = file;
                                    scope.model.name = name;
                                });

                                $self.find('.form-file>button').css({ backgroundImage: 'url(' + file + ')' });
                                $self.find('.form-file>button').html('');

                                //$self.find('.form-img').html('');
                                //$self.find('.form-img').html('<img src=\"' + file + '\" alt="" /><div class="name">' + name + '</div>');
                            }

                            reader.readAsDataURL(self.files[0]);
                        }
                        else {
                            $.confirm({
                                title: 'Warning',
                                content: 'Sorry, the file type is wrong, choose either JPG, JPEG, PNG, or SVG file types',
                                buttons: { ok: { text: 'ok' } }
                            });
                        }
                    }
                });

                scope.$on('modelUpdated', function (event, model) {
                    var id = attrs.id;
                    if (model[id] === undefined) {
                        model[id] = {
                            src: "",
                            name: ""
                        };
                    }
                    //$(elem).parents('.pane-settings').find('.form-img').html('<img src="' + model[id].src + '" alt="" /><div class="name">' + model[id].name + '</div>');
                });

            }
        };
    }

})();
