(function () {
    'use strict';

    angular.module('brokers')
        .directive('svReviewsPublicInfo', function () {
            return {
                replace: true,
                templateUrl: 'scripts/brokers/directives/sv-reviews-public-info.html',
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
