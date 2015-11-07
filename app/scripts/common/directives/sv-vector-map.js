(function () {
    'use strict';

    angular.module('common')
        .directive('svVectorMap', function () {
            return {
                replace: true,
                templateUrl: 'scripts/common/directives/sv-vector-map.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
