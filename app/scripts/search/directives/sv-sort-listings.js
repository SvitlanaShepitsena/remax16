(function () {
    'use strict';

    angular.module('search')
        .directive('svSortListings', function (localStorageService) {
            return {
                replace: true,
                templateUrl: 'scripts/search/directives/sv-sort-listings.html',
                scope: {
					sortBy:'='
                },
                link: function ($scope, el, attrs) {
	                $scope.$watch('sortBy', function (newValue, oldValue) {
		                if (!newValue) {
			                return ;
		                }
		                localStorageService.set('sortBy',newValue);
		                $scope.$emit('sort:homes',newValue);
	                });

                }
            };
        });
})();
