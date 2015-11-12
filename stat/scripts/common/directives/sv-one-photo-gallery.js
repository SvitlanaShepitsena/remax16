(function () {
    'use strict';

    angular.module('common')
        .value('s3', {files: []})
        .value('galleryModal', {shown: false})
        .directive('svOnePhotoGallery', function (AWSServ, galleryModal, $location, $mdDialog, dt, $timeout, $state) {
            return {
                replace: true,
                templateUrl: 'scripts/common/directives/sv-one-photo-gallery.html',
                scope: {
                    activeImg: '='
                },
                link: function ($scope, el, attrs) {
                    var delay = 400;
                    var reverseOrder = true;

                    $scope.bucketUrl = "https://s3-us-west-2.amazonaws.com/kohl/";
                    AWSServ.getImages('kohl').then(function (files) {
                        $scope.images = [];

                        if (reverseOrder) {
                            for (var i = files.length - 1; i >= 0; i--) {

                                var file = files[i];
                                $scope.images.push(file);
                            }
                        } else {
                            $scope.images = files;
                        }

                        if ($scope.activeImg) {
                            $scope.showGalleryModal($scope.activeImg);
                        }

                    });

                    $scope.showGalleryModal = function (index) {

                        if (galleryModal.state) {
                            return;
                        }

                        var imgCollection = {
                            images: $scope.images,
                            currentIndex: index
                        }

                        galleryModal.state = true;

                        $timeout(function () {
                            $state.go('app.events.kohl2015.photo-gallery', {photoId: index}, {reload: false}).then(function () {
                                showModal(imgCollection);
                            });
                        }, delay);
                    };

                    function showModal(collection) {
                        dt.vm = collection;
                        $mdDialog.show({
                            controller: DialogControllerInfo,
                            templateUrl: 'scripts/common/views/photo-gallery-modal.html',
                        });
                    }

                    function DialogControllerInfo($scope, $mdDialog, dt, s3) {

                        $scope.awsBase = 'https://s3-us-west-2.amazonaws.com/kohl/';
                        $scope.imgIndex = dt.vm.currentIndex;

                        $scope.files = dt.vm.images;

                        var maxImg = $scope.files.length - 1;
                        $scope.currentImage = $scope.awsBase + $scope.files[$scope.imgIndex];
                        //$scope.event = dt.vm;

                        $scope.nextSvImage = function () {
                            var i = $scope.imgIndex;
                            i++;
                            if (i > maxImg) {
                                i = 0;
                            }

                            $scope.imgIndex = i;
                            $timeout(function () {
                                $scope.currentImage = $scope.awsBase + $scope.files[$scope.imgIndex];
                                $state.go('app.events.kohl2015.photo-gallery', {photoId: i});
                            }, delay);
                        };
                        $scope.prevSvImage = function () {
                            var i = $scope.imgIndex;
                            i--;
                            if (i < 0) {
                                i = maxImg;
                            }
                            $scope.imgIndex = i;
                            $timeout(function () {
                                $scope.currentImage = $scope.awsBase + $scope.files[$scope.imgIndex];
                                $state.go('app.events.kohl2015.photo-gallery', {photoId: i});
                            }, delay);
                        };

                        $scope.hide = function () {
                            $mdDialog.hide();
                            galleryModal.state = false;
                            $location.path(urlParser($location.path()));
                        };
                    }

                    function urlParser(path, currentIndex) {
                        var start = path.lastIndexOf('/') + 1;
                        path = path.substr(0, start);
                        if (!_.isUndefined(currentIndex)) {
                            path += currentIndex;
                        } else {
                            //path = path.slice(0, path.length - 1);
                        }
                        return path;

                    }
                }

            };
        });
})();
