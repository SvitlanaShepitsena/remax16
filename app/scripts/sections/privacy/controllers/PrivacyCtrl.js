(function () {
    'use strict';

    angular.module('sections.privacy')
        .controller('PrivacyCtrl', function ($scope, companyName) {
            $scope.companyName = companyName;

        });
})();

