(function () {
    angular.module('app', [
            // modules
            'ngAnimate',
            'angular-capitalize-filter',
            'ngCookies',
            'ngMaterial',
            'ngMessages',
            'ngSanitize',
            'toastr',
            'pascalprecht.translate',
            'ui.router',
            'firebase',
            'textAngular',
            'brokers',
            'angular-input-stars',
            'auth',
            'search',
            'listings',
            'ad',
            'blogs',
            'auth.user',
            'auth.manager',
            'customers',
            'auth.notifications',
            'ad.promotion',
            'article',
            'common',
            'sections.header',
            'sections.about',
            'sections.home',
            'sections.contact',
            'sections.testimonials',
            'sections.privacy',
            'sections.terms',
            'ngImgCrop',
            // 3rd party modules
            'lumx',
            'angular-flexslider',
            'ezfb',
            'ngMap',
            'ngFileUpload',
            'LocalStorageModule',
        ])
        .config(function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('remax')
        })
        .config(function (ezfbProvider) {
            ezfbProvider.setInitParams({
                appId: '258826184311868',
                version: 'v2.3'
            });
        })
        .config(function ($mdThemingProvider, $mdIconProvider, $compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|mms):/);
            $mdIconProvider
                .defaultIconSet("./assets/svg/avatars.svg", 128)
                .icon("menu", "./assets/svg/menu.svg", 24)
                .icon("share", "./assets/svg/share.svg", 24)
                .icon("google_plus", "./assets/svg/google_plus.svg", 512)
                .icon("hangouts", "./assets/svg/hangouts.svg", 512)
                .icon("twitter", "./assets/svg/twitter.svg", 512)
                .icon("phone", "./assets/svg/phone.svg", 512);
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('red');
        })
        .config(function ($sceProvider, $translateProvider) {
            $translateProvider.useSanitizeValueStrategy(null);
            $translateProvider.useCookieStorage();
            //$translateProvider.preferredLanguage('en_US');
            //$translateProvider.storageKey('en_US');
        })
        .config(function ($httpProvider, $locationProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
            $urlMatcherFactoryProvider.strictMode(false);
            $urlRouterProvider.rule(function ($injector, $location) {
                var path = $location.path(), search = $location.search();
                var path2 = path[path.length - 1];
                if (path2 !== '/') {
                    if (search === {}) {
                        var myPath = path + '/';
                        console.log(myPath);
                        return myPath;
                    } else {
                        var params = [];
                        angular.forEach(search, function (v, k) {
                            params.push(k + '=' + v);
                        });
                        return path + '/?' + params.join('&');
                    }
                }
            });
            $locationProvider
                .html5Mode(true)
                .hashPrefix('!');
        })
        .factory('$exceptionHandler', function ($injector) {
            return function (exception, cause) {
                var $rootScope = $injector.get('$rootScope');
                var toastr = $injector.get('toastr');
                exception.message = exception.stack;
                ////Comment on Production
                toastr.error('ERROR!' + exception.message);
                $rootScope.$broadcast('error');
                throw exception;
            };
        })
        .config(['$compileProvider', function ($compileProvider) {
            $compileProvider.debugInfoEnabled(false);
        }]);
})();