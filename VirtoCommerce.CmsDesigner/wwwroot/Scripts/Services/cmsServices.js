var _apiKey = 'a348fa7508d342f6a32f8bf6c6681a2a';
var _storefrontUrl = 'http://localhost:2082/';
var _storefrontMasterUrl = 'http://localhost:2083/';
var _apiUrl = 'http://localhost/';

var _apiKey2 = 'a348fa7508d342f6a32f8bf6c6681a2a';
var _apiUrl2 = 'https://admin-demo.virtocommerce.com/';
//var _apiUrl2 = 'https://hru-admin-dev.azurewebsites.net/';



var _tempBlockId = 1;

myapp.service('theme-editor.cmsgit.api', ['$http', function ($http) {

        function getUrl(cmsPage) {
            return cmsPage.apiUrl + 'api/cmsgit/' + cmsPage.storeId + '/' + cmsPage.userName + '/' + cmsPage.fileName;
        }

        return {
            get: function (cmsPage) {
                return $http.get(getUrl(cmsPage) + '/get?api_key=' + cmsPage.apiKey + '&t=' + new Date().getTime());
            },
            isunique: function (cmsPage) {
                return $http.get(getUrl(cmsPage) + '/' + cmsPage.permalink + '/isunique?api_key=' + cmsPage.apiKey + '&t=' + new Date().getTime());
            },
            set: function (cmsPage) {
                //return $http.post(getUrl(cmsPage) + '/set?api_key=' + cmsPage.apiKey + '&content=' + cmsPage.content);

                var data = { content: cmsPage.content };

                var options = {
                    headers: {
                        Accept: 'application/json',
                        ContentType: 'application/json',
                        contentType: "application/json; charset=UTF-8"
                    }
                }

                return $http.post(getUrl(cmsPage) + '/set?api_key=' + cmsPage.apiKey, data, options);
            },
            sendToProduction: function (cmsPage) {
                return $http.post(getUrl(cmsPage) + '/sendToProduction?api_key=' + cmsPage.apiKey + '&t=' + new Date().getTime());
            },
            refreshProduction: function (cmsPage) {
                return $http.post(cmsPage.apiUrl + 'api/cmsgit/' + cmsPage.storeId + '/refreshProduction?api_key=' + cmsPage.apiKey + '&t=' + new Date().getTime());
            },
            uploadFile: function (name, data) {
                //var params = new HttpParams();
                //var headers = new HttpHeaders();
                //headers.set('Authorization', this.loopBackAuth.accessTokenId);
                //headers.set('Content-Type', 'multipart/form-data');

                var url = _apiUrl2 + 'api/platform/assets?folderUrl=blogs&name=' + name + '&api_key=' + _apiKey2;

                var headers = {
                    accept: 'application/json'
                }

                var options = {
                    headers: {
                        Accept: 'application/json',
                        ContentType: 'application/json'
                    }
                }

                var formData = new FormData();
                formData.append('uploadedFile', data, name);

                //return "ok";
                //$http({
                //    method: 'POST',
                //    url: url,
                //    data: formData,
                //    headers: {
                //        'Content-Type': 'application/json'
                //    }
                //});


                $http.post(url, formData, options)
                    .success(function (data, status, headers, config) {
                    })
                    .error(function () {
                        console.log("ERROR IN SAVE WORK!");
                    });

                return "ok";
            }
        }

	}]);
    