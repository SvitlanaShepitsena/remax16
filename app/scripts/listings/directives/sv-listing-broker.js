(function () {
	'use strict';
	angular.module('listings')
		.directive('svListingBroker', function (userAuth) {
			return {
				replace: true,
				templateUrl: 'scripts/listings/directives/sv-listing-broker.html',
				link: function ($scope, el, attrs) {
				}
			};
		});
})();
