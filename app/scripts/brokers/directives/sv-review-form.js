(function () {
    'use strict';

    angular.module('brokers')
        .directive('svReviewForm', function () {
            return {
                templateUrl: 'scripts/brokers/directives/sv-review-form.html',
                link: function ($scope, el, attrs) {
                    $scope.rate = 7;
                    $scope.max = 10;
                    $scope.isReadonly = false;

                    $scope.hoveringOver = function(value) {
                        $scope.overStar = value;
                        $scope.percent = 100 * (value / $scope.max);
                    };

                    $scope.ratingStates = [
                        {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
                        {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
                        {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
                        {stateOn: 'glyphicon-heart'},
                        {stateOff: 'glyphicon-off'}
                    ];
                }
            };
        });
})();
