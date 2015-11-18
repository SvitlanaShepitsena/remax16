(function () {
    'use strict';
    angular.module('search')
        .directive('svLxDropdown', function (localStorageService, $mdMedia) {
            return {
                priority: 100,
                require: '^lxDropdown',
                link: function ($scope, el, attrs, ctrl) {
                    if (localStorageService.get('mapView') === 'map') {
                        ctrl.open();
                    } else {
                        //ctrl.close();
                    }
                    $scope.$on('mapGrid:changed', function (event, isMap) {
                        if (isMap) {
                            ctrl.open();
                        } else {
                            ctrl.close();
                        }
                    });

                    $scope.$watch(function () {
                        return $mdMedia('sm');
                    }, function (sm) {
                        if (!sm) {
                            //ctrl.open();
                        } else {
                            ctrl.close()
                        }
                    });


                    el.on('click', function (event) {
                        if (ctrl.isOpened) {
                            ctrl.close();
                        } else {
                            ctrl.open();
                        }
                        event.stopPropagation();
                        event.preventDefault();
                    });
                }
            };
        });
})();
