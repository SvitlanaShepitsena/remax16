(function () {
    'use strict';

    angular.module('brokers')
        .directive('svReviewsPublicInfo', function (VMServ, FbGenServ, $mdDialog, $stateParams, agentsUrl, userAuth, avatar) {

            function extractCustomerReviews(agents, customer) {

                var reviewedAgents = _.filter(agents, function (agent) {
                    return agent.reviews ? agent.reviews[customer] : false;
                });
                var reviews = _.map(reviewedAgents, function (agent) {
                    var extReview = agent.reviews[customer];
                    extReview.agent = {id: agent.$id, fullname: agent.fName + ' ' + agent.lName, pic: agent.pic}
                    return extReview
                });
                return reviews;
            }

            return {
                replace: true,
                scope: {
                    customerPage: '='
                },
                templateUrl: 'scripts/brokers/directives/sv-reviews-public-info.html',
                link: function ($scope, el, attrs) {
                    var reviewsUrl;
                    if (userAuth.profile) {

                        $scope.userName = userAuth.profile.userName;
                    }

                    if ($scope.customerPage) {
                        reviewsUrl = agentsUrl;
                    } else {

                        reviewsUrl = agentsUrl + $stateParams.id + '/reviews/';
                    }
                    $scope.avatar = avatar;
                    var reviews = FbGenServ.getArrayLive(reviewsUrl);
                    reviews.$loaded().then(function () {
                        if ($scope.customerPage) {
                            var customerId;
                            if ($stateParams.uid) {
                                customerId = $stateParams.uid;
                            }
                            if ($stateParams.cid) {
                                customerId = $stateParams.cid;
                            }
                            $scope.reviews = extractCustomerReviews(reviews, customerId);
                            var i = 1;

                        } else {
                            $scope.reviews = reviews;

                        }
                        if (userAuth.profile) {
                            var reviewers = _.pluck(reviews, 'customer');
                            $scope.addReviewBtn = reviewers.indexOf(userAuth.profile.userName) === -1;
                        }
                        reviews.$watch(function () {
                            if (userAuth.profile) {
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
                        //$scope.editState = true;
                    };

                    /*Edit Review Modal*/
                    $scope.showReviewModal = function (review) {
                        VMServ.set(review);
                        $mdDialog.show(
                            {
                                controller: ReviewController,
                                templateUrl: 'scripts/customers/templates/modalCustomerReview.html'
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
