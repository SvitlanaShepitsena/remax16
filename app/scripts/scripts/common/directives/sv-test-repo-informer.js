(function () {
    'use strict';

    angular.module('scripts.common')
        .directive('svTestRepoInformer', function () {
            return {
                replace: true,
                templateUrl: 'scripts/scripts/common/directives/sv-test-repo-informer.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
