(function () {
	'use strict';
	angular.module('listings')
		.directive('svNewListingForm', function (localStorageService, FbGenServ, homesUrl, toastr) {
			return {
				replace: true,
				templateUrl: 'scripts/listings/directives/sv-new-listing-form.html',
				scope: {
					listing: '='
				},
				link: function ($scope, el, attrs) {
					$scope.listingTabIndex = localStorageService.get('listingTabIndex') || 0;
					$scope.switchTab = function (index) {
						localStorageService.set('listingTabIndex', index-1);
					};
					$scope.saveListing = function (listing) {
						FbGenServ.saveObject(homesUrl + listing.mls, listing).then(function (ref) {
							toastr.success('Changes have been saved')
						});
					};
				}
			};
		});
})();
