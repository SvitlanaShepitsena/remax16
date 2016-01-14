(function () {
    'use strict';

    angular.module('sections.terms')
        .controller('TermsOfUseCtrl', function ($scope, companyName) {
            $scope.companyName = companyName;

        });
})();

