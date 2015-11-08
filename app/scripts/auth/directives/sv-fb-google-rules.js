(function () {
    'use strict';

    angular.module('auth')
        .directive('svFbGoogleRules', function () {
            return {
                replace: true,
                templateUrl: 'scripts/auth/directives/sv-fb-google-rules.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
