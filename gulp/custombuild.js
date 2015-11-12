'use strict'
var del = require('del');

exports.run = function (gulp,$,_) {


    var DIR_JS_LIBS = './bower_components';
    var DIR_BUILD = './build/'
    gulp.task('buildMaterial',function () {
    var modules = [
        'angular-material/modules/js/core/core.js',
        'angular-material/modules/js/core/default-theme.js',
        'angular-material/modules/js/backdrop/backdrop.js',
        'angular-material/modules/js/toast/toast.js',
        'angular-material/modules/js/sticky/sticky.js',
    ];
    var boilerplate = [
        '(function(){' +
        '    angular.module("ngMaterial", ["ng", "ngAnimate", "ngAria", "material.core", "material.core.theming.palette", "material.core.theming", "material.components.toast"]);' +
        '    })();'
    return gulp.src(modules, {cwd: DIR_JS_LIBS})
        .pipe(concat({path: 'custom.js', cwd: ''}))
        .pipe(insert.prepend(boilerplate))
        .pipe(gulp.dest(DIR_JS_LIBS + 'angular-material/'));
});

gulp.task('buildDependencies',['buildMaterial'], function () {
var deps = [
    'angular/angular.js',
    'angular-route/angular-route.js',
    'angular-ui-router/release/angular-ui-router.js',
    'angular-material/custom.js',
];
return gulp.src(deps, {cwd: DIR_JS_LIBS})
    .pipe(concat({path: 'deps.min.js', cwd: ''}))
    .pipe(uglify())
    .pipe(gulp.dest(DIR_BUILD));
})


}
