(function () {
    'use strict'
    angular.module('app')
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

            $stateProvider
                .state("app", {
                    abstract: true,
                    controller: "AppCtrl as app",
                    resolve: {
                        userPromise: function (AuthenticationServ) {
                            return AuthenticationServ.checkUserStatus();
                        }
                    },
                    template: "<div ui-view=''></div>"
                })
                .state("app.home", {
                    url: "/",
                    controller: "HomeCtrl as home",
                    templateUrl: "scripts/sections/home/views/homeCtrl.html"
                })
                .state("app.sign-up", {
                    url: "/sign-up",
                    controller: "SignUpCtrl as signUp",
                    templateUrl: "scripts/auth/views/sign-upCtrl.html",
                    resolve: {
                        currentUser: function (userAuth, $q) {
                            return $q(function (resolve, reject) {
                                var isLoggedIn = !!userAuth.profile;
                                if (isLoggedIn) {
                                    reject('You are already logged in. Logout First');
                                } else {
                                    resolve();
                                }
                            })
                        }
                    }
                })
                .state("app.login", {
                    url: "/login",
                    controller: "LoginCtrl as login",
                    templateUrl: "scripts/auth/views/loginCtrl.html",
                    resolve: {
                        currentUser: function (userAuth, $q) {
                            return $q(function (resolve, reject) {
                                var isLoggedIn = !!userAuth.profile;
                                if (isLoggedIn) {
                                    reject('You are already logged in');
                                } else {
                                    resolve();
                                }
                            })
                        }
                    }
                })
                .state("app.y", {
                    url: "/y",
                    controller: "YCtrl as y",
                    templateUrl: "ad/classified/views/yCtrl.html"
                })
//#state'
        });
})();