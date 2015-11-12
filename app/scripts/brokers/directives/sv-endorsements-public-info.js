(function () {
    'use strict';

    angular.module('brokers')
        .directive('svEndorsementsPublicInfo', function () {
            return {
                replace: true,
                templateUrl: 'scripts/brokers/directives/sv-endorsements-public-info.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
