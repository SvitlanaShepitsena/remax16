(function () {
    'use strict';
    angular.module('common')
        .directive('svImgBackground', function ($state, defaultImage, avatarBroker) {
            return {
                replace: true,
                templateUrl: 'scripts/common/directives/sv-img-background.html',
                scope: {
                    svImage: '=',
                    imgWidth: '@', imgHeight: '@',
                    linkRoute: '@',
                    params: '='
                },
                link: function ($scope, el, attrs) {
                    $scope.avatarBroker = avatarBroker;
                    $scope.svImage = $scope.svImage || defaultImage;
                    $scope.navigate = function () {
                        $state.go($scope.linkRoute, {id: $scope.params});
                    };
                    $scope.$watch('svImage', function (newValue, oldValue) {
                        if (newValue == oldValue) {
                            return;
                        }
                        $scope.loadImage(newValue);
                    });
                    $scope.loadImage = function (imgSrc) {
                        $scope.svImage = imgSrc || defaultImage;
                        var img = new Image();
                        img.src = imgSrc || defaultImage;
                        img.onload = function () {
                            var width = img.width;
                            var height = img.height;
                            var breakPoint = 1;
                            var iElm = el.find('i');
                            iElm.css({
                                'background-image': 'url(' + $scope.svImage + ')',
                                'background-size': 'cover',
                                'background-position': '50% 25%',
                                'height': 100 + '%',
                                'display': 'block'
                            });
                        }
                    };
                    $scope.loadImage($scope.svImage);
                }
            };
        });
})();
