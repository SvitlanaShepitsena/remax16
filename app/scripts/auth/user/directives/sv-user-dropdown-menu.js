(function () {
    'use strict';
    angular.module('auth.user')
        .directive('svUserDropdownMenu', function (avatar, alex, userAuth) {
            return {
                templateUrl: 'scripts/auth/user/directives/sv-user-dropdown-menu.html',
                link: function ($scope, el, attrs) {
                    if (userAuth && userAuth.profile) {
                        $scope.brokerId = userAuth.profile.brokerId;
                        $scope.user = userAuth.profile;
                    }

                    $scope.defaultAvatar = avatar;
                    $scope.alexAvatar = alex;
                }
            };
        });
})();
