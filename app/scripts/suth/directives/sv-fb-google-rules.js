(function () {
    'use strict';

    angular.module('suth')
        .directive('svFbGoogleRules', function () {
            return {
                replace: true,
                templateUrl: 'scripts/suth/directives/sv-fb-google-rules.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
