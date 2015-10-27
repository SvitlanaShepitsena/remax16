'use strict'
var _ = require('lodash');
var moment = require('moment');
module.exports = {
    getCls: function (cls, section, clId) {
        var arrCls = [];
        var keys = _.keysIn(cls);

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = cls[key];
            value.id = key;
            value.timestamp = moment(value.timestamp, 'x').format("LLL");
            arrCls.push(value);
        }

        var sectionCls = _.filter(arrCls, function (cl) {
            return cl.section === section;
        });

        if (clId) {
            return _.find(sectionCls, {id: clId});
        }

        return sectionCls;
    }
}
