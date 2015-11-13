(function () {
    'use strict';
    angular.module('sections.home')
        .controller('HomeCtrl', function ($scope, userAuth) {
            $scope.user = userAuth.profile;
        });
})();
