(function () {
	'use strict';
	angular.module('search')
		.directive('svLxDropdown', function (localStorageService) {
			return {
				priority: 100,
				require: '^lxDropdown',
				link: function ($scope, el, attrs, ctrl) {
					if (localStorageService.get('mapView') === 'map') {
						ctrl.open();
					}
					$scope.$on('mapGrid:changed', function (event, isMap) {
						if (isMap) {
							ctrl.open();
						} else{
							ctrl.close();
						}
					});

					el.on('click', function (event) {
						if (ctrl.isOpened) {
							ctrl.close();
						} else {
							ctrl.open();
						}
						event.stopPropagation();
						event.preventDefault();
					});
				}
			};
		});
})();
