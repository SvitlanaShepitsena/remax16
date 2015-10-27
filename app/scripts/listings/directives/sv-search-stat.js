(function () {
	'use strict';
	angular.module('listings')
		.directive('svSearchStat', function ($rootScope, $location) {
			return {
				templateUrl: 'scripts/listings/directives/sv-search-stat.html',
				link: function ($scope, el, attrs) {
					var cur = $location.$$path;
					$scope.isRent = cur.indexOf('rent') > -1;
					//$scope.isRent=cur.indexOf()
					$rootScope.$watch('hmCnt', function (newValue, oldValue) {
						if (newValue) {
							$scope.cnt = newValue;
						}
					});
				}
			};
		});
})();
