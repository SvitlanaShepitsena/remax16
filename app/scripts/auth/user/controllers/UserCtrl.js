(function () {
    'use strict';
    angular.module('auth.user')
        .controller('UserCtrl', function ($scope, userAuth) {
            $scope.brokerId = userAuth.profile.brokerId;
            $scope.user = userAuth.profile;
            /*broker*/
            var res = $scope.user.isStaff();
            $scope.isBroker = res;
            /*customer*/
            var resCustomer = $scope.user.isCustomer();
            $scope.isCustomer = resCustomer;
        });
})();

