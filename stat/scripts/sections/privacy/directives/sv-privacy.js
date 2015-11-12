(function () {
    'use strict';

    angular.module('sections.privacy')
        .directive('svPrivacy', function () {
            return {
                replace: true,
                templateUrl: 'scripts/sections/privacy/directives/sv-privacy.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
