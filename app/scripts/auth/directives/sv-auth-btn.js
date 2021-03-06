(function () {
    'use strict';
    angular.module('auth')
        .directive('svAuthBtn', function (userAuth, AuthenticationServ, AgentServ, $state, $mdMedia, toastr) {
            return {
                templateUrl: 'scripts/auth/directives/sv-auth-btn.html',
                replace: true,
                link: function ($scope) {
                    $scope.goToDashboard = function () {
                        if (userAuth.profile.role === 'manager') {
                            $state.go('app.manager.users', {uid: userAuth.key});
                        } else {
                            $state.go('app.user.account-settings', {uid: userAuth.profile.userName});
                        }
                    };
                    $scope.isIe = AgentServ.isIe();

                    $scope.$watchCollection(function () {
                        return userAuth.profile;
                    }, function (newValue, oldValue) {
                        if (newValue === oldValue) {
                            return;
                        }
                        $scope.user = newValue;
                    });

                    $scope.loginProvider = function (provider) {
                        AuthenticationServ.authWithProvider(provider).then(function () {
                            if (userAuth.profile && userAuth.profile.isManager()) {
                                $state.go('app.manager.users', {uid: userAuth.key})
                            }

                            if (userAuth.profile && userAuth.profile.isStaff()) {
                                $state.go('app.user.listings', {uid: userAuth.profile.userName})
                            }
                            if (userAuth.profile && userAuth.profile.isCustomer()) {
                                $state.go('app.user.user-bookmarks', {uid: userAuth.profile.userName})
                            }

                        });
                    };
                    $scope.logout = function () {
                        AuthenticationServ.logout();
                        $scope.user = null;
                        $state.go('app.home');
                    };
                    $scope.$watch(function () {
                        return $mdMedia('gt-md');
                    }, function (size) {
                        $scope.gtMd = size;
                    });
                    $scope.$watch(function () {
                        return $mdMedia('gt-sm');
                    }, function (size) {
                        $scope.gtSm = size;
                    });
                    $scope.$watch(function () {
                        return $mdMedia('sm');
                    }, function (size) {
                        $scope.sm = size;
                    });
                }
            };
        });
})();
