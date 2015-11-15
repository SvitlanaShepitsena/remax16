'use strict'
var _ = require('lodash');
var tagsArticleFilter = require('../filters/TagsArticlesFilter');
var appconstants = require('./const');
module.exports = {
    process: function (blogs) {
        var sortBlogs = _.sortBy(blogs, 'timestamp');
        sortBlogs = _.take(sortBlogs, 4);
        return sortBlogs;
    }
}
