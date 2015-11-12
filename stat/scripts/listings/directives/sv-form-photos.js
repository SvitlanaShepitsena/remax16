(function () {
	'use strict';
	angular.module('listings')
		.directive('svFormPhotos', function () {
			return {
				replace: true,
				templateUrl: 'scripts/listings/directives/sv-form-photos.html',
				link: function ($scope, el, attrs) {
					$scope.$watchCollection('listing.images', function (newValue, oldValue) {
						if (!newValue) {
							return;
						}
						$scope.orderedImages = _.map(newValue, function (image, index) {
							return {
								url: image,
								order: index + 1
							};
						})
					});
					$scope.removeOrderedImage = function (img) {
						for (var i = 0; i < $scope.listing.images.length; i++) {
							var arrImage = $scope.listing.images[i];
							if (arrImage == img.url) {
								$scope.listing.images.splice(i, 1);
								$scope.listingForm.$pristine = false;
								break;
							}
						}
					};
				}
			};
		});
})();
