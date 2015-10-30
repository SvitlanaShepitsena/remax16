(function () {
    'use strict'
    var fbDomain = 'svet-test';

    angular.module('common')
        .constant('routesRadioShow', ['app', 'app.home'])
        .constant('domain', fbDomain === 'svet' ? 'production' : 'test')
        .constant('url', 'https://' + fbDomain + '.firebaseio.com/')
        .constant('homesUrl', 'https://' + fbDomain + '.firebaseio.com/homes/')
        .constant('maps', 'http://maps.google.com/?q=')
        .constant('users', 'https://' + fbDomain + '.firebaseio.com/user-management/users/')
        .constant('corporate', 'https://' + fbDomain + '.firebaseio.com/events/corporate/')
        .constant('ads', 'https://' + fbDomain + '.firebaseio.com/ads/')
        .constant('companyName', 'Re/Max 1st Class')
        .constant('companyWebsite', 'http://remax1stclass.com/')
        .constant('companyStreetAddress', '4023 W. Church St.')
        .constant('companyCity', 'Chicago')
        .constant('defaultBrokerTitle', 'Real Estate Agent')
        .constant('companyState', 'IL')
        .constant('companyZip', '60076')
        .constant('companyPhone', '(847) 674-9797')
        .constant('companyFax', '(847) 674-0411')
        .constant('companyEmail', 'remax1stclass@gmail.com')

        .constant('icon', {
            sHome: "img/icons/house-red.png",
            mHome: "img/icons/office-building-purple.png",
            condo: "img/icons/condo-blue.png",
            townhouse: "img/icons/townhouse-green.png",
            duplex: "img/icons/house-green.png",
            land: "img/icons/landmark.png"
        })


        .constant('distanceToNearest', 20000)
        .constant('defaultImage', '../img/common/image-empty.png')

        .constant('userAuth', {})
        .constant('lastEditorPost', {})
        .constant('svetNews', {})
        .constant('svetBlogsConst', {})
        .constant('svetEventsConst', {})
        .constant('svetPost', {})
        .constant('classified', {})
        .constant('feedback', {})
        .constant('viewModalConst', {})
        .constant('dt', {})
        .constant('classifiedInterval', 63000)
        //.constant('classifiedInterval', 3000)
        .service('urlUsers', function (url) {
            this.url = url + '/user-management/users/';
        })
        .constant('SOCIAL_PLUGINS', [
            'like', 'share-button', 'send', 'post', 'video',
            'comments', 'page', 'follow'
        ])
        .value('weather', 'https://publicdata-weather.firebaseio.com/chicago')
        .value('avatar', '/img/auth/user.png')
        .value('googleMap', '/img/listings/google_maps.png')
        .value('avatarBroker', '/img/auth/broker.png')
        .value('defimg', '/img/common/picture-thumb.png')
        .value('alex', '/img/auth/alex-sepia.jpg')
        .value('mapStyler',

            [{"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"simplified"},{"saturation":-60}]}]

                )


})();
