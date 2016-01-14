(function () {
    'use strict';
    angular.module('auth.manager')
        .controller('ManagerUsersCtrl', function ($scope, companyName) {
            $scope.companyName = companyName;
        });
})();

