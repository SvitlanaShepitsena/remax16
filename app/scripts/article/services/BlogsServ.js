(function () {
    'use strict';
    angular.module('article')
        .factory('BlogsServ', function ($q, url, users, $firebaseObject, $firebaseArray, blogsConst) {

            var ref = new Firebase(url + 'blogs');
            var blogsArr = $firebaseArray(ref);


            function setPublicBlogsLive(blogs) {
                var publicNews = _.where(blogs, {isPublic: true, isBlog: true});
                blogsConst.public = _.sortBy(publicNews, '-timestamp');
            }

            return {
                setBlogsLive: function () {
                    return $q(function (resolve, reject) {
                        blogsArr.$loaded(function () {
                            setPublicBlogsLive(blogsArr);
                            blogsArr.$watch(function () {
                                setPublicBlogsLive(blogsArr);
                            });
                            resolve();
                        })
                    });
                },
                getRandomBlogs: function () {
                    return $q(function (resolve, reject) {
                        blogsArr.$loaded(function () {

                            resolve(_.take(_.shuffle(blogsArr), 4));
                        })
                    });
                }
            };
        });
})();
