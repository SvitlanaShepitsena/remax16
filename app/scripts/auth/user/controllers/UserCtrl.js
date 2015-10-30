(function () {
    'use strict';
    angular.module('auth.user')
        .controller('UserCtrl', function ($scope, userAuth) {
            $scope.brokerId = userAuth.profile.brokerId;
            $scope.user = userAuth.profile;
        });
})();

