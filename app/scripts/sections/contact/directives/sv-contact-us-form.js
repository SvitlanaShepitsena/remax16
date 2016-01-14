(function () {
    'use strict';

    angular.module('sections.contact')
        .directive('svContactUsForm', function () {
            return {
                replace: true,
                templateUrl: 'scripts/sections/contact/directives/sv-contact-us-form.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
