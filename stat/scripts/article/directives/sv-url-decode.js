(function () {
	'use strict';
	angular.module('article')
		.directive('svUrlDecode', function () {
			return {
				priority: 1001,
				require: '?^ngModel',
				link: function ($scope, el, attrs, ctrl) {
					var ngModel = attrs.ngModel;
					ctrl.$formatters.push(function (modelValue) {
						if (!modelValue) {
							return;
						}
						if (modelValue && _.isString(modelValue)) {
							return modelValue.replace(/&#34;/g, '"');
						}
					})
				}
			};
		});
})();
