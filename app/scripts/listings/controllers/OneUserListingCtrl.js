(function () {
	'use strict';
	angular.module('listings')
		.controller('OneUserListingCtrl', function ($scope, listing) {
			$scope.listing = listing;
		});
})();

