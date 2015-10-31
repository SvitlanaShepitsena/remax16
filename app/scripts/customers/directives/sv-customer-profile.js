(function () {
    'use strict';

    angular.module('customers')
        .directive('svCustomerProfile', function () {
            return {
                replace: true,
                templateUrl: 'scripts/customers/directives/sv-customer-profile.html',
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
