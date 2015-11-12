(function () {
    'use strict';
    angular.module('article')
        .directive('svNewArticleForm', function ( $sce,  $rootScope, SvHtmlValidatorServ, $state, toastr, SectionsServ, ArticlesServ,  userAuth, FormattedDateServ, TagsServ) {
            return {
                replace: true,
                templateUrl: 'scripts/article/directives/sv-new-article-form.html',
                link: function ($scope, el, attrs) {
                    $scope.safeParsing = function (html) {
                        return $sce.trustAsHtml(html);
                    };
                    $scope.$watch('articleForm', function (newValue, oldValue) {
                        if (newValue) {
                            $scope.isFormChanged = newValue.$dirty;
                        }
                    });
                    $scope.$watchGroup(['article.title', 'article.summary'], function (newValue, oldValue) {
                        // Remove in Production
                        $rootScope.title = newValue[0];
                        $rootScope.summary = newValue[1];
                    });
                    $scope.sections = SectionsServ.all();
                    $scope.user = userAuth.profile;
                    $scope.saveArticle = function (isPublic, form) {
                        if (form.$valid) {
                            var parsedArticle = SvHtmlValidatorServ.cleanArticle($scope.article);
                            ArticlesServ.add(parsedArticle, isPublic).then(function (article) {
                                    $state.go($state.current.name, {artId: article.$id});
                                    $scope.article.$id = article.$id;
                                    toastr.success('Your changes are successfully saved');
                                },
                                function (error) {
                                    console.log(error);
                                }
                            );
                        } else {
                            console.log((str));
                            var erorrNotice = 'Please fill required fields:\n';
                            for (var i = 0; i < form.$error.required.length; i++) {
                                var error = form.$error.required[i];
                                erorrNotice += str(error.$name, 'titleize') + '\n';
                            }
                            toastr.error(erorrNotice);
                        }
                    }
                    $scope.cancelArticle = function (active) {
                        $state.go('app.user.blogs');
                    }
                    if ($scope.artId) {
                        //    edit
                        $scope.article = ArticlesServ.get($scope.artId);
                    } else {
                        //    new article
                        $scope.article = {
                            isBlog: $scope.artType === 'blog',
                            author: userAuth.profile.isEditor() ? 'Александр Этман' : userAuth.profile.userName
                        }
                    }
                }
            };
        });
})();
