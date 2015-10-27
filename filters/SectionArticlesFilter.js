'use strict'
var _ = require('lodash');
module.exports = {
    getSectionNews: function (articles, section, isBlog) {
        var sectionArticles = _.filter(articles, function (article) {
            return article.section === section && article.isBlog === isBlog;
        });
        return sectionArticles;
    }
}
