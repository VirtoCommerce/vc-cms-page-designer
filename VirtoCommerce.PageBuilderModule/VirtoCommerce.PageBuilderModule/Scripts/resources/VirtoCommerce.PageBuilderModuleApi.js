angular.module('VirtoCommerce.PageBuilderModule')
.factory('VirtoCommerce.PageBuilderModuleApi', ['$resource', function ($resource) {
    return $resource('api/VirtoCommerce.PageBuilderModule');
}]);
