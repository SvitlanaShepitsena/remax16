(function () {
    'use strict';

    angular.module('brokers')
        .directive('svBrokerProfileInfo', function (FbGenServ, homesUrl, BrokerProfileServ, userAuth, $mdDialog, toastr, companyPhone, companyFax) {
            return {
                replace: true,
                templateUrl: 'scripts/brokers/directives/sv-broker-profile-info.html',
                link: function ($scope, el, attrs) {

                    $scope.saveProfile = function () {
                        FbGenServ.saveObject(homesUrl + 'agents/' + userAuth.profile.brokerId, $scope.broker).then(function (ref) {
                        });
                        $scope.editState = false;
                    };


                    /*Highlights*/
                    $scope.showBrokerProfileHighlightsModal = function (broker) {

                        BrokerProfileServ.set(BrokerProfileServ.get());
                        $mdDialog.show(
                            {
                                controller: BrokerProfileHighlightsController,
                                templateUrl: 'scripts/brokers/views/modalBrokerProfileHighlights.html',
                            }
                        );
                    };

                    function BrokerProfileHighlightsController($scope, $mdDialog, $rootScope) {
                        $scope.brokerModal = BrokerProfileServ.get();
                        $scope.saveProfileModal = function () {
                            $rootScope.$broadcast('broker:changed', $scope.brokerModal);
                            $mdDialog.hide();


                        };
                        $scope.hide = function () {
                            $scope.brokerModal = BrokerProfileServ.getPrevious();
                            $mdDialog.hide();
                        };
                        $scope.cancel = function () {
                            $scope.brokerModal = BrokerProfileServ.getPrevious();
                            $mdDialog.cancel();
                        };
                    }

                    /*Accreditation*/
                    $scope.showBrokerAccreditationModal = function (broker) {
                        BrokerProfileServ.set(BrokerProfileServ.get());
                        $mdDialog.show(
                            {
                                controller: BrokerAccreditationController,
                                templateUrl: 'scripts/brokers/views/modalBrokerAccreditation.html',
                            }
                        );
                    };

                    function BrokerAccreditationController($scope, $mdDialog,$rootScope) {
                        $scope.brokerModal = BrokerProfileServ.get();
                        $scope.saveProfileModal = function () {
                            $rootScope.$broadcast('broker:changed', $scope.brokerModal);
                            $mdDialog.hide();


                        };
                        $scope.hide = function () {
                            $scope.brokerModal = BrokerProfileServ.getPrevious();
                            $mdDialog.hide();
                        };
                        $scope.cancel = function () {
                            $scope.brokerModal = BrokerProfileServ.getPrevious();
                            $mdDialog.cancel();
                        };
                    }

                    /*Prof info*/
                    $scope.showBrokerProfInfoModal = function (broker) {
                        BrokerProfileServ.set(BrokerProfileServ.get());
                        $mdDialog.show(
                            {
                                controller: BrokerProfInfoController,
                                templateUrl: 'scripts/brokers/views/modalBrokerProfInfo.html',
                            }
                        );
                    };

                    function BrokerProfInfoController($scope, $mdDialog, $rootScope) {
                        $scope.brokerModal = BrokerProfileServ.get();
                        $scope.saveProfileModal = function () {
                            $rootScope.$broadcast('broker:changed', $scope.brokerModal);
                            $mdDialog.hide();


                        };
                        $scope.hide = function () {
                            $mdDialog.hide();
                            $scope.brokerModal = BrokerProfileServ.getPrevious();
                        };
                        $scope.cancel = function () {
                            $mdDialog.cancel();
                            $scope.brokerModal = BrokerProfileServ.getPrevious();
                        };
                    }

                    /*Experience*/
                    $scope.showBrokerExperienceModal = function (broker) {
                        BrokerProfileServ.set(BrokerProfileServ.get());
                        $mdDialog.show(
                            {
                                controller: BrokerExperienceController,
                                templateUrl: 'scripts/brokers/views/modalBrokerExperience.html',
                            }
                        );
                    };

                    function BrokerExperienceController($scope, $mdDialog, $rootScope) {
                        $scope.brokerModal = BrokerProfileServ.get();
                        $scope.saveProfileModal = function () {
                            console.log('run here sv-broker-profile.js');
                            $rootScope.$broadcast('broker:changed', $scope.brokerModal);
                            $mdDialog.hide();


                        };
                        $scope.hide = function () {
                            $scope.brokerModal = BrokerProfileServ.getPrevious();
                            $mdDialog.hide();
                        };
                        $scope.cancel = function () {
                            $scope.brokerModal = BrokerProfileServ.getPrevious();
                            $mdDialog.cancel();
                        };
                    }

                }
            };
        });
})();
