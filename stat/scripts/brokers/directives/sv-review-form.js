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

                    $scope.saveRating = function (review) {

                        var userName = userAuth.profile.userName;
                        review.customer = getUserName(userAuth);
                        review.avatar = userAuth.profile.avatar;
                        review.email = userAuth.profile.email;
                        review.timestamp = moment().format('x');
                        var reviewUrl = agentsUrl + $stateParams.id + '/reviews/' + userName;


                        FbGenServ.saveObject(reviewUrl, review).then(function (ref) {
                            $scope.removeEditState();
                        })


                    };
                    var getUserName = function (userAuth) {
                        if (userAuth.google) {
                            return userAuth.google.displayName;
                        }
                        if (userAuth.facebook) {
                            return userAuth.facebook.displayName;
                        }
                        return _.startCase(userAuth.profile.userName);

                    };



                }
            };
        });
})();
