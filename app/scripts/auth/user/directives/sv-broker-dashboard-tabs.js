(function () {
    'use strict';
    angular.module('auth.user')
        .directive('svBrokerDashboardTabs', function (FbGenServ, toastr, homesUrl, $state, $location, $stateParams, $timeout, $q, SearchSaleServ, userAuth, GetAgentsInfoServ, avatarBroker) {
            return {
                replace: true,
                templateUrl: 'scripts/auth/user/directives/sv-broker-dashboard-tabs.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    $scope.editState = false;
                    $scope.brokerId = $stateParams.id;
                    $scope.brokerIdAuth = userAuth.profile ? userAuth.profile.brokerId : null;
                    $scope.hasEditAccess = $scope.brokerId === $scope.brokerIdAuth;

                    $scope.showEditBtn = function () {
                        if ($scope.selectedIndex !== 0) {
                            return false;
                        }
                        if (!userAuth || !userAuth.profile || $scope.brokerId !== userAuth.profile.brokerId) {
                            return false;
                        }
                        return true;
                    };
                    $scope.editProfile = function () {
                        $timeout(function () {
                            $scope.editState = true;
                        }, 10)
                    };

                    $scope.$on('broker:changed', function (evt, editedBroker) {
                        $scope.saveBrokerProfile(editedBroker);
                    });

                    $scope.saveBrokerProfile = function (editedBroker) {
                        $scope.editState = false;
                        FbGenServ.saveObject(homesUrl + 'agents/' + userAuth.profile.brokerId, editedBroker).then(function (ref) {
                            toastr.success('Changes have been saved');

                            $scope.broker = editedBroker;
                        });
                    };
                    $scope.avatarBroker = avatarBroker;
                    GetAgentsInfoServ.getByKey($scope.brokerId).then(function (broker) {
                        $scope.broker = broker;
                    });
                    $scope.selectedIndex = 0;
                    $scope.key = userAuth.key;
                    $scope.user = userAuth.profile;
                    $scope.$watch('selectedIndex', function (current, old) {
                        switch (current) {
                            case 0:
                                $state.go("^.profile");
                                break;
                            case 1:
                                $state.go("^.listings");
                                break;
                            case 2:
                                $state.go("^.blogs");
                                break;
                            case 3:
                                $state.go("^.reviews");
                                break;
                            default:
                                $state.go("^.profile");
                                break;
                        }
                    });
                }
            };
        });
})();
