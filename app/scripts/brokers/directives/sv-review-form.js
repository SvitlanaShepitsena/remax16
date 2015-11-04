(function () {
    'use strict';

    angular.module('brokers')
        .directive('svReviewForm', function (userAuth, FbGenServ, agentsUrl, $stateParams) {
            return {
                templateUrl: 'scripts/brokers/directives/sv-review-form.html',
                scope: {
                    evaluation: '=',
                    reviewForm: '=',
                    removeEditState: '&'
                },
                link: function ($scope, el, attrs) {
                    $scope.evaluation = $scope.evaluation || {rating: 0};

                    $scope.saveRating = function (evaluation) {

                        var userName = userAuth.profile.userName;
                        evaluation.customer = userName;
                        evaluation.avatar = userAuth.profile.avatar;
                        evaluation.email = userAuth.profile.email;

                        var reviewUrl = agentsUrl + $stateParams.id + '/reviews/' + userName;
                        FbGenServ.saveObject(reviewUrl, evaluation).then(function (ref) {
                            $scope.removeEditState();
                        })


                    };


                }
            };
        });
})();
