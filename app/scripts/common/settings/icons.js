(function () {
    angular.module('common')
        .config(function ($mdIconProvider) {
            $mdIconProvider
                .defaultIconSet("./img/svg/avatars.svg", 128)
                .icon("sv-menu", "./img/svg/menu.svg", 24)
                .icon("sv-close", "./img/svg/close.svg", 24)
                .icon("share", "./img/svg/share.svg", 24)
                .icon("google_plus", "./img/svg/google_plus.svg", 512)
                .icon("hangouts", "./img/svg/hangouts.svg", 512)
                .icon("twitter", "./img/svg/twitter.svg", 512)
                .icon("phone", "./img/svg/phone.svg", 512);
        });
})();

