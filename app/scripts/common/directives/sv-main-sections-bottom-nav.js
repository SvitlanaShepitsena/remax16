(function () {
    'use strict';

    angular.module('common')
        .directive('svMainSectionsBottomNav', function () {
            return {
                replace: true,
                templateUrl: 'scripts/common/directives/sv-main-sections-bottom-nav.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
