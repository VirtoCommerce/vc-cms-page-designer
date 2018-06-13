myapp.factory('defaultSchema', ['$http', defaultSchema]);

  function defaultSchema($http) {
    var obj = {};

    obj.getDefaultSchema = function() {
      return $http.get('settings_schema.json');
    }

    return obj;
  }
