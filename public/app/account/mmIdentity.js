angular.module('app').factory('mmIdentity', function () {
    return {
        currentUser: undefined,
        isAuthenticated: function () {
            return !!this.currentUser;
            }
        }
});
