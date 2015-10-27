(function () {
    'use strict';

    angular.module('auth.user')
        .directive('svBrokerListingsTabs', function () {
            return {
                replace: true,
                templateUrl: 'scripts/auth/user/directives/sv-broker-listings-tabs.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
