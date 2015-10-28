(function () {
	'use strict';
	angular.module('search')
		.factory('SearchSaleServ', function (GetAgentsInfoServ, QueryServ, SearchFilterServ, $rootScope, userAuth, $q, url, users, $firebaseObject, $firebaseArray) {
			var saleUrl = url + 'homes/sale/';
			var refSale = $firebaseArray(new Firebase(saleUrl));
			//-----------
			var rentUrl = url + 'homes/rent/';
			var refRent = $firebaseArray(new Firebase(rentUrl));
			//-----------
			return {
				getBrokerHomes: function (email, key) {
					return $q(function (resolve, reject) {
						if (!key) {
							GetAgentsInfoServ.getByEmail(email).then(function (broker) {
								if (broker) {
									var brokerKey = broker.fName.toLowerCase() + '_' + broker.lName.toLowerCase();
									refSale.$loaded().then(function (res) {
										var agentHomes = [];
										res.forEach(function (home, key) {
											if (home.agent === brokerKey || (home.agent.email && home.agent.email == email)) {
												agentHomes.push(home);
											}
										});
										GetAgentsInfoServ.get(agentHomes).then(function (homesWithAgents) {
											resolve(homesWithAgents);
										})
									});
								}
							});
						} else {
							GetAgentsInfoServ.getByKey(key).then(function (broker) {
								if (broker) {
									var brokerKey = key;
									refSale.$loaded().then(function (res) {
										var agentHomes = [];
										res.forEach(function (home, key) {
											if (home.agent == brokerKey || (home.agent.$id && home.agent.$id == key)) {
												agentHomes.push(home);
											}
										});
										GetAgentsInfoServ.get(agentHomes).then(function (homesWithAgents) {
											resolve(homesWithAgents);
										})
									});
								}
							});
						}
					})
				},
				getHomes: function (query, isBroker) {
					var that = this;
					return $q(function (resolve, reject) {
						if (isBroker) {
							that.getBrokerHomes(null, isBroker).then(function (homes) {
								resolve(homes);
							});
						} else {
							var refSaleRent;
							if (query.params.indexOf('rent') > -1) {
								refSaleRent = refRent;
							} else {
								refSaleRent = refSale;
							}
							var queryObj = {};
							if (query) {
								var queryArr = _.compact(query.params.split('/'));
							}
							refSaleRent.$loaded().then(function (filteredHomes) {
								var pSaleRent = queryArr.indexOf('homes-for-rent');
								queryObj.saleRent = pSaleRent > -1 ? 'rent' : 'sale';
								var pAddress = queryArr.indexOf('address');
								var pMaxPrice = queryArr.indexOf('max-price');
								var pBedrooms = queryArr.indexOf('bedrooms');
								var pType = queryArr.indexOf('type');

								if (pAddress > -1) {
									var address = queryArr[pAddress + 1];
									queryObj.address = address.replace(/\s+/g, ' ');
									queryObj.address = address.replace(/-+/g, ' ');

									filteredHomes = SearchFilterServ.byAddress(filteredHomes, queryObj.address);
								}

								if (pMaxPrice > -1) {
									var maxPrice = queryArr[pMaxPrice + 1];
									queryObj.maxPrice = maxPrice;
									filteredHomes = SearchFilterServ.byMaxPrice(filteredHomes, maxPrice);
								}

								if (pBedrooms > -1) {
									var bedrooms = queryArr[pBedrooms + 1];
									queryObj.bedrooms = bedrooms.split('-').map(function (bed) {
										return parseInt(bed);
									});
									filteredHomes = SearchFilterServ.byBedrooms(filteredHomes, bedrooms);
								}

								if (pType > -1) {
									var homeType = queryArr[pType + 1];
									homeType = homeType.replace(/&+/g, '/');
									homeType = homeType.replace(/-+/g, ' ');
									homeType = homeType.replace(/~+/g, '-');
									queryObj.type = homeType;
									filteredHomes = SearchFilterServ.byType(filteredHomes, homeType);
								}

								QueryServ.set(queryObj);
								$rootScope.$broadcast('query:changed', queryObj);
								GetAgentsInfoServ.get(filteredHomes).then(function (homesWithAgents) {
									resolve(homesWithAgents);
								})
							}).catch(function (err) {
								console.log(err);
							})
						}
					});
				},
				getHome: function (mls) {
					var homeUrlSale = saleUrl + mls;
					var homeUrlRent = rentUrl + mls;
					return $q(function (resolve, reject) {
						var fbObj = $firebaseObject(new Firebase(homeUrlSale));
						fbObj.$loaded().then(function (res) {
							if (res.$value === null) {
								fbObj = $firebaseObject(new Firebase(homeUrlRent));
								fbObj.$loaded().then(function (home) {
									GetAgentsInfoServ.getByKey(home.agent).then(function (agentObj) {
										home.agentObj = agentObj;
										resolve(home);
									});
								})
							} else {
								GetAgentsInfoServ.getByKey(res.agent).then(function (agentObj) {
									res.agentObj = agentObj;
									resolve(res);
								});
							}
						}).catch(function (error) {
							console.log(error);
						})
					});
				},
			};
		});
})();
