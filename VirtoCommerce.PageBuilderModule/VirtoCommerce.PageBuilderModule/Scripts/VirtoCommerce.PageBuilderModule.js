//Call this to register our module to main application
var moduleTemplateName = "VirtoCommerce.PageBuilderModule";

if (AppDependencies != undefined) {
    AppDependencies.push(moduleTemplateName);
}

angular.module(moduleTemplateName, [])
.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('workspace.VirtoCommerce.PageBuilderModule', {
                url: '/VirtoCommerce.PageBuilderModule',
                templateUrl: '$(Platform)/Scripts/common/templates/home.tpl.html',
                controller: [
                    '$scope', 'platformWebApp.bladeNavigationService', function ($scope, bladeNavigationService) {
                        var newBlade = {
                            id: 'blade1',
                            controller: 'VirtoCommerce.PageBuilderModule.blade1Controller',
                            template: 'Modules/$(VirtoCommerce.PageBuilderModule)/Scripts/blades/helloWorld_blade1.tpl.html',
                            isClosingDisabled: true
                        };
                        bladeNavigationService.showBlade(newBlade);
                    }
                ]
            });
    }
])
.run(['$rootScope', 'platformWebApp.mainMenuService', 'platformWebApp.toolbarService', 'platformWebApp.widgetService', '$state',
    function ($rootScope, mainMenuService, toolbarService, widgetService, $state) {
        var addNewPageCommand = {
            name: '',
            icon: '',
            executeMethod: function (blade) {

            },
            canExecuteMethod: function (blade) {
                return true;
            }
        };
        toolbarService.register(addNewPageCommand, '');
        //var productResetCommand = {
        //    name: "es.reset-cache.buttons.reset-cache", // localized name for button
        //    icon: 'fa fa-eraser',
        //    executeMethod: function (blade) {
        //        moduleApi.resetProduct(blade.itemId).then(function () {
        //            //alert("Кэш сброшен")
        //        }).catch(function () {
        //            //alert("Ошибка сброса кэша");
        //        });
        //    },
        //    canExecuteMethod: function (blade) {
        //        return true;
        //    },
        //    index: 101
        //};
        //toolbarService.register(productResetCommand, 'virtoCommerce.catalogModule.itemDetailController'); // second params is a blade name


        //Register module in main menu
        var menuItem = {
            path: 'browse/VirtoCommerce.PageBuilderModule',
            icon: 'fa fa-cube',
            title: 'VirtoCommerce.PageBuilderModule',
            priority: 100,
            action: function () { $state.go('workspace.VirtoCommerce.PageBuilderModule') },
            permission: 'VirtoCommerce.PageBuilderModulePermission'
        };
        mainMenuService.addMenuItem(menuItem);
    }
]);
