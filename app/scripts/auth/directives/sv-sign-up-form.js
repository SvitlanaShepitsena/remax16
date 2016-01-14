(function () {
    'use strict';
    angular.module('auth')
        .directive('svSignUpForm', function (ProfileServ, $state, toastr, AuthenticationServ, $mdDialog , companyName) {
            return {
                replace: true,
                templateUrl: 'scripts/auth/directives/sv-sign-up-form.html',
                scope: {
                    headerTitle: '@',
                    name: '@',
                    register: '@',
                    registering: '@',
                    conditions: '@',
                    registered: '@',
                    login: '@'
                },
                controller: function ($scope) {
                    $scope.companyName = companyName;
                    $scope.user = {
                        userName: '',
                        email: '',
                        password: ''
                    };
                    //$scope.user = {
                    //    userName: faker.internet.userName(),
                    //    email: faker.internet.email(),
                    //    password: '123456',
                    //    acceptPolicy: false
                    //};
                    $scope.termsConditionsModal = function () {
                        $mdDialog.show(
                            {
                                controller: TermsConditionsController,
                                templateUrl: 'scripts/auth/views/terms-conditions.html',
                            }
                        );
                    };
                    function TermsConditionsController($scope, $mdDialog) {
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

                    $scope.createLocalUser = function () {
                        if ($scope.signUpForm.$invalid) {
                            $scope.signUpForm.userName.$touched = true;
                            $scope.signUpForm.email.$touched = true;
                            $scope.signUpForm.password.$touched = true;
                            return;
                        }
                        $scope.user.userName = $scope.user.userName.replace(/\s+/g, '-').toLowerCase();
                        ProfileServ.createLocalUser($scope.user.email, $scope.user.password, $scope.user.userName,true,$scope.user.subscriptions).then(function () {
                                //AuthenticationServ.appLogin($scope.user.email, $scope.user.password).then(function (profile) {
                                $state.go('app.login');
                                toastr.warning('Please, confirm you email and then you will be able to log in', {timeOut: 5000});
                                //});
                            }
                        ).catch(function (error) {
                            toastr.error(error.message);
                            $scope.signUpForm.email.$invalid = true;
                            $scope.signUpForm.email.$touched = true;
                        })
                    }
                },
                link: function ($scope, el, attrs) {
                    $scope.companyName = companyName;
                }
            };
        });
})();
