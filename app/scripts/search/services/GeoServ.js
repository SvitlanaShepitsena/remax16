(function () {
	'use strict';
	angular.module('search')
		.factory('GeoServ', function ($q, GeoCoder, url, users, $firebaseObject, $firebaseArray, $timeout) {
			return {
				translate: function (homes) {
					return $q(function (resovle, reject) {
						var addresses = _.pluck(homes, 'address');
						var convertedAddresses = addresses.map(function (address) {
							var txtAddr = address.street + ',' + address.city.trim() + ',' + address.state + ',' + address.zip;
							return txtAddr;
						});
						var promises = [];
						var recursionCounter = 0;

						function recursive(index) {
							if (promises.length === convertedAddresses.length || promises.length === 10) {
								$q.all(promises).then(function (res) {
									resovle(res);
								}).catch(function (err) {
									console.log(err);
									$timeout(function () {
										if (recursionCounter > 2) {
											reject('Limit Err');
										} else {
											recursionCounter++;
											var nIter = index + 1;
											recursive(nIter);
										}
									}, 4000);
								});
								return;
							}
							var address = convertedAddresses[index];
							console.log(address);
							promises.push(GeoCoder.geocode({address: address}));
							var next = index + 1;
							(function iif(iter) {
								$timeout(function () {
									recursive(iter);
								}, 10);
							})(next);
						}

						recursive(0);
					});
				},
			};
		});
})();
