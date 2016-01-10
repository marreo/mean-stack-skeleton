angular.module('app').controller('mmNavBarLoginCtrl', function ($scope, $http, mmIdentity, mmNotifier, mmAuth, $location) {
    $scope.identity = mmIdentity;
    $scope.signin = function (username, password) {
        mmAuth.authenticateUser(username, password).then(function (success) {
            if (success) {
                mmNotifier.notify('Welcome ' + username + "!");
            } else {
                mmNotifier.notify("Username/Password combination incorrect");
            }
        })
    }

    $scope.signout = function () {
        mmAuth.signoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            mmNotifier.notify("Logout successful");
            $location.path('/');
        })
    }
});