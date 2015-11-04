(function () {
    'use strict';

    angular.module('brokers')
        .directive('svReviewsPublicInfo', function () {
            return {
                replace: true,
                scope:{

                },
                templateUrl: 'scripts/brokers/directives/sv-reviews-public-info.html',
                link: function ($scope, el, attrs) {
                    $scope.reviewForm=false;

                    $scope.addReview = function () {

                    $scope.reviewForm=true;
                    };

                }
            };
        });
})();
