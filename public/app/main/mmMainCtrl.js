angular.module('app').controller('mmMainCtrl', function ($scope, $http) {
    $scope.courses = [
    { name:"Tiger Nixon", featured:"true", published: new Date("2011/04/25")},
    { name:"Garrett Winters", featured:"false", published: new Date("2011/07/25")},
    { name:"Ashton Cox", featured:"true", published: new Date("2009/01/12")},
    { name:"Cedric Kelly", featured:"false", published: new Date("2012/03/29")},
    { name:"Airi Satou", featured:"true", published: new Date("2008/11/28")},
    { name:"Brielle Williamson", featured:"false", published: new Date("2012/12/02")},
    { name:"Herrod Chandler", featured:"true", published: new Date("2012/08/06")},
    ]
    
    $scope.name = "";
    
    $scope.submitForm = function () {
        $http.post('/User', {name: $scope.name});
    }
});