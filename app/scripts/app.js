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
            'ngFileUpload',
            'lumx',
            'textAngular',
            'brokers',
            'angular-input-stars',
            'auth',
            'search',
            'listings',
            'ad',
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
            'sections.privacy',
            'sections.terms',
            'ngImgCrop',
            // 3rd party modules
            'angular-flexslider',
            'ezfb',
            'ngMap',
            'LocalStorageModule',
        ])
        .config(function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('remax')
        })
        .config(function (ezfbProvider) {
            ezfbProvider.setInitParams({
                appId: '781844735261747',
                version: 'v2.3'
            });
        })
        .config(function ($mdThemingProvider, $mdIconProvider, $compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|mms):/);
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
            //$compileProvider.debugInfoEnabled(false);
        }]);
})();