(function () {
	'use strict';
	angular.module('common')
		.directive('svZeroLengthNotice', function ($filter, userAuth) {
			return {
				replace: true,
				templateUrl: 'scripts/common/directives/sv-zero-length-notice.html',
				scope: {
					list: '=',
					filter: '@',
					filterValue: '@',
					item: '@',
					ownerField: '@'
				},
				link: function ($scope, el, attrs) {
					$scope.filteredList = $scope.list;
				}
			};
		});
})();
