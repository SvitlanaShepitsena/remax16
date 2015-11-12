(function () {
    'use strict'
    angular.module('article', ['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
            /*=article*/
                .state("app.blog", {
                    url: "/blogs/:id",
                    controller: "ArticleCtrl as article",
                    templateUrl: "scripts/article/views/articleCtrl.html"
                })
                .state("app.user.create-article", {
                    url: "/manage-article/:artType/:artId",
                    controller: "CreateArticleCtrl as createArticle",
                    onEnter: function ($rootScope) {
                        $rootScope.$broadcast('image-search-show');
                    },
                    onExit: function ($rootScope) {
                        $rootScope.$broadcast('image-search-hide');
                    },
                    templateUrl: "scripts/article/views/create-articleCtrl.html"
                })
                .state("app.endorsements", {
                    url: "/endorsements",
                    controller: "EndorsementsCtrl as Endorsements",
                    templateUrl: "scripts/article/views/endorsements.html"
                })
            //.state("app.one-blog", {
            //    url: "/svet-blog/:author/:postId",
            //    controller: "OneBlogCtrl",
            //    templateUrl: "scripts/article/views/one-blogCtrl.html"
            //})
//#state'
        });
})();