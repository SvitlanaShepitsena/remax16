(function () {
    'use strict';

    angular.module('brokers')
        .directive('svReviewsPublicInfo', function (VMServ, FbGenServ, $mdDialog, $stateParams, agentsUrl, userAuth, avatar) {
            return {
                replace: true,
                scope: {},
                templateUrl: 'scripts/brokers/directives/sv-reviews-public-info.html',
                link: function ($scope, el, attrs) {
                    $scope.userName = userAuth.profile.userName;
                    var reviewsUrl = agentsUrl + $stateParams.id + '/reviews/';
                    $scope.avatar = avatar;
                    var reviews = FbGenServ.getArrayLive(reviewsUrl);
                    reviews.$loaded().then(function () {
                        $scope.reviews = reviews;
                        if (userAuth) {
                            var reviewers = _.pluck(reviews, 'customer');

                            $scope.addReviewBtn = reviewers.indexOf(userAuth.profile.userName) === -1;
                        }
                        reviews.$watch(function () {
                            if (userAuth) {
                                var reviewers = _.pluck(reviews, 'customer');

                                $scope.addReviewBtn = reviewers.indexOf(userAuth.profile.userName) === -1;
                            }
                            $scope.reviews = reviews;
                        })
                    });

                    $scope.removeReview = function (review) {

                        FbGenServ.removeObj(reviewsUrl + review.$id).then(function () {

                        })
                        $scope.editState = false;
                        $scope.reviewForm = false;
                    };

                    $scope.setEditState = function (review) {
                        $scope.showReviewModal(review);
                        $scope.editState = true;
                    };

                    /*Edit Review Modal*/
                    $scope.showReviewModal = function (review) {
                        VMServ.set(review);
                        $mdDialog.show(
                            {
                                controller: ReviewController,
                                templateUrl: 'scripts/customers/templates/modalCustomerReview.html',
                            }
                        );
                    };

                    function ReviewController($scope, $mdDialog, $rootScope, VMServ) {
                        $scope.reviewModal = VMServ.get();
                        $scope.saveReviewModal = function (UpdatedReview) {
                            $mdDialog.hide();


                        };
                        $scope.hide = function () {
                            $mdDialog.hide();
                            $scope.reviewModal = VMServ.getPrevious();
                        };
                        $scope.cancel = function () {
                            $scope.reviewModal = VMServ.getPrevious();
                            $mdDialog.cancel();
                        };
                    }

                    $scope.removeEditState = function () {
                        $scope.editState = false;
                    };

                    $scope.addReview = function () {

                        $scope.reviewForm = true;
                    };

                    $scope.range = function (count) {

                        var ratings = [];

                        for (var i = 0; i < count; i++) {
                            ratings.push(i)
                        }

                        return ratings;
                    }

                }
            };
        });
})();
