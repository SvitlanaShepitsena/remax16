(function () {
    'use strict';

    angular.module('customers')
        .directive('svCustomerProfileThumb', function () {
            return {
                replace: true,
                templateUrl: 'scripts/customers/directives/sv-customer-profile-thumb.html',

                scope: {
                    customer: '='
                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
