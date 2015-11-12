(function () {
    'use strict';

    angular.module('common')
        .directive('svFbFollow', function ($location) {
            return {
                replace: true,
                templateUrl: 'scripts/common/directives/sv-fb-follow.html',
                scope: {},
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
