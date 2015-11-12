(function () {
    'use strict';

    angular.module('listings')
        .directive('svListingFull', function (avatarBroker,  maps, googleMap, $mdDialog, defaultImage) {
            function concatenate(address) {
                var final = '';
                for (var p in address) {
                    final += address[p] + ' ';
                }
                return final.trim();
            }

            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-listing-full.html',
                scope: {
                    home: '='
                },
                link: function ($scope, el, attrs) {
                    $scope.defaultImage = defaultImage;
                    $scope.showListingGalleryModal = function () {
                        $mdDialog.show(
                            {
                                controller: FeedbackModalController,
                                templateUrl: 'scripts/listings/views/modalListingGallery.html',
                            }
                        );
                    };
                    function FeedbackModalController($scope, $mdDialog, feedbackConst) {
                        if (feedbackConst.feedback) {
                            $scope.feedback = feedbackConst.feedback;
                        }
                        $scope.hide = function () {
                            $mdDialog.hide();
                        };
                        $scope.cancel = function () {
                            $mdDialog.cancel();
                        };
                        $scope.answer = function (answer) {
                            $mdDialog.hide(answer);
                        };
                    }

                    $scope.avatarBroker = avatarBroker;
                    $scope.maps = maps;
                    $scope.googleMap = googleMap;
                    $scope.fullAddress = maps + concatenate($scope.home.address);

                }
            };
        });
})();
