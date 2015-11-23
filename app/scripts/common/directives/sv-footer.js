(function () {
    'use strict';

    angular.module('common')
        .directive('svFooter', function (companyStreetAddress, companyCity, companyState, companyZip, companyPhone, companyFax, companyName) {
            return {
                replace: true,
                templateUrl: 'scripts/common/directives/sv-footer.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    $scope.companyStreetAddress = companyStreetAddress;
                    $scope.companyCity = companyCity;
                    $scope.companyState = companyState;
                    $scope.companyZip = companyZip;
                    $scope.companyName = companyName
                    $scope.companyPhone = companyPhone;
                    $scope.companyFax = companyFax;

                }
            };
        });
})();
