(function () {
    'use strict';

    angular.module('brokers')
        .directive('svReviewForm', function () {
            return {
                replace: true,
                templateUrl: 'scripts/brokers/directives/sv-review-form.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
