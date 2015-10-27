(function () {
    'use strict';
    angular.module('sections.home')
        .controller('HomeCtrl', function ($scope, userAuth, svetNews, $timeout) {
            $scope.user = userAuth.profile;


        });
})();
