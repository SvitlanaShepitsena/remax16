(function () {
	'use strict';
	angular.module('listings')
		.controller('UserListingEditCtrl', function ($scope, listing) {
			$scope.listing = listing;
		});
})();

