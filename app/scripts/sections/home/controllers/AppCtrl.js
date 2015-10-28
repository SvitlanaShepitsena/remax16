(function () {
    'use strict';
    angular.module('sections.home')
        .controller('AppCtrl', function AppCtrl($sce, AgentServ, NotificationsServ, userAuth, svetNews, $timeout, $mdSidenav, $mdMedia,
                                                NewsProcessServ, $state, $scope, $rootScope, toastr, routesRadioShow) {
            $rootScope.frameUrl = $sce.trustAsResourceUrl("http://localhost");
            $rootScope.user = userAuth.profile;
            $rootScope.news = svetNews.public;

            $rootScope.$on('homeNewsChanged', function () {
                $rootScope.news = svetNews.public;
            });
            var currentRoute = $state.current;
            console.log(currentRoute);
            if (currentRoute.url === '/') {
                $rootScope.homeStyle = true;
            } else {
                $rootScope.homeStyle = false;
            }
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, error) {
                var routeName = toState.name;
                console.log(routeName);
                if (_.contains('app.home', routeName)) {
                    $rootScope.homeStyle = true;
                } else {
                    $rootScope.homeStyle = false;
                }
            });
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                toastr.warning(error);
            });
            $rootScope.$on('error', function () {
                toastr.error('error');
            });
            $scope.$on('image-search-show', function () {
                $scope.imageSearch = true;
            });
            $scope.$on('image-search-hide', function () {
                $scope.imageSearch = false;
            });

            $rootScope.toggleRight = function () {
                $mdSidenav('right').toggle();
            };
            $rootScope.$watch('appLoaded', function (newValue) {
                $scope.appLoaded = newValue;
            });
            $scope.$watch(function () {
                return $mdMedia('gt-lg');
            }, function (rightPanelShown) {
                if (rightPanelShown) {
                    $scope.showShifter = !AgentServ.isIe();
                } else {
                    $scope.showShifter = true;
                }
            });
        });
})();

