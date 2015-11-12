(function () {
    'use strict';

    angular.module('customers')
        .directive('svCustomerReviewsList', function () {
            return {
                replace: true,
                templateUrl: 'scripts/customers/directives/sv-customer-reviews-list.html',
                scope: {},
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
