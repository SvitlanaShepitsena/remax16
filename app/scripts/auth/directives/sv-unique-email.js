(function () {
    'use strict';

    angular.module('auth')
        .directive('svUniqueEmail', function () {
            return {
                replace: true,
                templateUrl: 'scripts/auth/directives/sv-unique-email.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
