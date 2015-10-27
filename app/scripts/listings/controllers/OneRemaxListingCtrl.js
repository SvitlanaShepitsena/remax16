(function () {
	'use strict';
	angular.module('listings')
		.controller('OneRemaxListingCtrl', function ($scope, $stateParams, SearchSaleServ, $state) {
			$scope.isRent = $state.current.name.indexOf('rent') > -1;
			SearchSaleServ.getHome($stateParams.mls, $scope.isRent).then(function (listing) {
				$scope.listing = listing;
			});
		});
})();

