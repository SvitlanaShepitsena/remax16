(function () {
    'use strict';
    angular.module('common')
        .filter('sectionNews', function () {
            return function (list, section,withouSection) {
                if (!list || !section) return list;

                if (section === 'endorsements') {
                    var finalList = _.filter(list, function (item) {
                        return item.endorsements;
                    });
                } else {
                    var finalList = _.filter(list, function (item) {
                        return item.section.toLowerCase() === section.toLowerCase();
                    });
                }
                if (withouSection) {
                    var finalList = _.filter(list, function (item) {
                        return item.section.toLowerCase() !== section.toLowerCase();
                    });
                }
                return finalList;
            };
        });
})();
