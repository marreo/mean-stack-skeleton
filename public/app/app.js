angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main', 
            controller: 'mmMainCtrl',
            controllerAs: 'main'
            });            
    $locationProvider.html5Mode(true);
});