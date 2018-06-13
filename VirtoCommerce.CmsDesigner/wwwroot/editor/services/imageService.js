myapp.factory('imageService', ['theme-editor.cmsgit.api', ImageService]);

function ImageService(cmsGitApi) {
    var obj = {};

    obj.upload = function (name, str) {
        // TODO: saving image


        var result = cmsGitApi.uploadFile(name, str);

        return "http://i.istockimg.com/image-zoom/77960171/3/380/214/stock-illustration-77960171-desktop-and-devices-evolution.jpg";
    };

    return obj;
}
