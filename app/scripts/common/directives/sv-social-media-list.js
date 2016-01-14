(function () {
    'use strict';

    angular.module('common')
        .directive('svSocialMediaList', function () {
            return {
                replace: true,
                templateUrl: 'scripts/common/directives/sv-social-media-list.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
