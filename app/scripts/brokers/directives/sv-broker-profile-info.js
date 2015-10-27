(function () {
    'use strict';

    angular.module('brokers')
        .directive('svBrokerProfileInfo', function (FbGenServ, homesUrl, userAuth, $mdDialog, toastr) {
            return {
                replace: true,
                templateUrl: 'scripts/brokers/directives/sv-broker-profile-info.html',
                link: function ($scope, el, attrs) {

                    $scope.saveProfile = function () {
                        FbGenServ.saveObject(homesUrl + 'agents/' + userAuth.profile.brokerId, $scope.broker).then(function (ref) {
                        });
                        $scope.editState = false;
                    };
                    $scope.$on('broker:changed', function () {
                        $scope.saveProfile();
                    });

                    /*Highlights*/
                    $scope.showBrokerProfileHighlightsModal = function (broker) {
                        $mdDialog.show(
                            {
                                broker: broker,
                                controller: BrokerProfileHighlightsController,
                                templateUrl: 'scripts/brokers/views/modalBrokerProfileHighlights.html',
                            }
                        );
                    };

                    function BrokerProfileHighlightsController($scope, $mdDialog, broker, $rootScope) {
                        $scope.broker = broker;
                        $scope.saveProfileModal = function () {
                            $rootScope.$broadcast('broker:changed');
                            $mdDialog.hide();


                        };
                        $scope.hide = function () {
                            $mdDialog.hide();
                        };
                        $scope.cancel = function () {
                            $mdDialog.cancel();
                        };
                    }

                    /*Accreditation*/
                    $scope.showBrokerAccreditationModal = function (broker) {
                        $mdDialog.show(
                            {
                                broker: broker,
                                controller: BrokerAccreditationController,
                                templateUrl: 'scripts/brokers/views/modalBrokerAccreditation.html',
                            }
                        );
                    };

                    function BrokerAccreditationController($scope, $mdDialog, broker, $rootScope) {
                        $scope.broker = broker;
                        $scope.saveProfileModal = function () {
                            $rootScope.$broadcast('broker:changed');
                            $mdDialog.hide();


                        };
                        $scope.hide = function () {
                            $mdDialog.hide();
                        };
                        $scope.cancel = function () {
                            $mdDialog.cancel();
                        };
                    }

                    /*Prof info*/
                    $scope.showBrokerProfInfoModal = function (broker) {
                        $mdDialog.show(
                            {
                                broker: broker,
                                controller: BrokerProfInfoController,
                                templateUrl: 'scripts/brokers/views/modalBrokerProfInfo.html',
                            }
                        );
                    };

                    function BrokerProfInfoController($scope, $mdDialog, broker, $rootScope) {
                        $scope.broker = broker;
                        $scope.saveProfileModal = function () {
                            $rootScope.$broadcast('broker:changed');
                            $mdDialog.hide();


                        };
                        $scope.hide = function () {
                            $mdDialog.hide();
                        };
                        $scope.cancel = function () {
                            $mdDialog.cancel();
                        };
                    }

                    /*Experience*/
                    $scope.showBrokerExperienceModal = function (broker) {
                        $mdDialog.show(
                            {
                                broker: broker,
                                controller: BrokerExperienceController,
                                templateUrl: 'scripts/brokers/views/modalBrokerExperience.html',
                            }
                        );
                    };

                    function BrokerExperienceController($scope, $mdDialog, broker, $rootScope) {
                        $scope.broker = broker;
                        $scope.saveProfileModal = function () {
                            console.log('run here sv-broker-profile.js');
                            $rootScope.$broadcast('broker:changed');
                            $mdDialog.hide();


                        };
                        $scope.hide = function () {
                            $mdDialog.hide();
                        };
                        $scope.cancel = function () {
                            $mdDialog.cancel();
                        };
                    }

                }
            };
        });
})();
