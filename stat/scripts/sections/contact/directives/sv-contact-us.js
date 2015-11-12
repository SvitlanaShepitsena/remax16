(function () {
    'use strict';

    angular.module('sections.contact')
        .directive('svContactUs', function (companyName, companyStreetAddress, companyCity, companyState, companyZip, companyPhone, companyFax, companyEmail) {
            return {
                replace: true,
                templateUrl: 'scripts/sections/contact/directives/sv-contact-us.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    $scope.companyName = companyName;
                    $scope.companyStreet = companyStreetAddress;
                    $scope.companyCity = companyCity;
                    $scope.companyState = companyState;
                    $scope.companyZip = companyZip;
                    $scope.companyPhone = companyPhone;
                    $scope.companyFax = companyFax;
                    $scope.companyEmail = companyEmail;

                }
            };
        });
})();
