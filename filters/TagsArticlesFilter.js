'use strict'
var _ = require('lodash');

function tagsToArray(tags) {
    var tagSplitter = ',';
    if (!_.contains(tags, tagSplitter)) {
        tagSplitter = ' ';
    }
    var arrTags= tags.split(tagSplitter);
    arrTags= _.map(arrTags, function (tag) {
        return tag.trim().toLowerCase();
    })

    return arrTags;

}
module.exports = {
    getArticleWithTags: function (articles, tags) {
        var articlesArr= _.toArray(_.cloneDeep(articles));
        var tagedArticles = [];
        for (var i = 0; i < articlesArr.length; i++) {
            var article = articlesArr[i];
            if (!article.tags) {
                continue
            }
            var artTags=tagsToArray(article.tags);
            var commonTags= _.intersection(artTags, tags);
            if (commonTags.length) {
                tagedArticles.push(article);
            }

        }

        return tagedArticles;
    }
}
