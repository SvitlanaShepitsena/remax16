(function () {
    'use strict';
    angular.module('common')
        .filter('sectionNews', function () {
            return function (list, section,withouSection) {
                if (!list || !section) return list;

                if (section === 'svet-recommends') {
                    var finalList = _.filter(list, function (item) {
                        return item.svetRecommends;
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
