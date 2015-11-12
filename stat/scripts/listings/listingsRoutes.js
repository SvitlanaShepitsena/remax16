(function () {
	'use strict'
	angular.module('listings', [])
		.config(function ($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state("app.user.listings", {
					url: "/listings",
					controller: "UserListingsCtrl",
					templateUrl: "scripts/auth/user/views/user-listingsCtrl.html"
				})
				.state("app.user.listings.one", {
					url: "/:mls",
					resolve: {
						listing: function (SearchSaleServ, $stateParams) {
							var mls = $stateParams.mls;
							return SearchSaleServ.getHome(mls);
						}
					},
					controller: "OneUserListingCtrl",
					templateUrl: "scripts/listings/views/one-user-listingCtrl.html"
				})

				.state("app.user.listings.one.edit", {
					url: "/edit",
					controller:"UserListingEditCtrl",
					templateUrl: "scripts/listings/views/user-listing-editCtrl.html"
				})
				.state("app.user.create-listing", {
					url: "/create-listing",
					controller: "CreateListingCtrl",
					templateUrl: "scripts/listings/views/create-listingCtrl.html"
				})
//#state'
		});
})();