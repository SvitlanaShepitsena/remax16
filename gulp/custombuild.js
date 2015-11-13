'use strict'
var del = require('del');
var path = require('path');
var angularMatPath;

exports.run = function (gulp, $, _) {


    gulp.task('buildM', function () {
        var modules = [
            'angular-material/modules/js/core/core.js',
            'angular-material/modules/js/core/default-theme.js',
            'angular-material/modules/js/backdrop/backdrop.js',
            'angular-material/modules/js/divider/divider.js',
            'angular-material/modules/js/autocomplete/autocomplete.js',
            'angular-material/modules/js/bottomSheet/bottomSheet.js',
            'angular-material/modules/js/button/button.js',
            'angular-material/modules/js/checkbox/checkbox.js',
            'angular-material/modules/js/content/content.js',
            'angular-material/modules/js/dialog/dialog.js',
            'angular-material/modules/js/progressCircular/progressCircular.js',
            'angular-material/modules/js/icon/icon.js',
            'angular-material/modules/js/input/input.js',
            'angular-material/modules/js/list/list.js',
            'angular-material/modules/js/select/select.js',
            'angular-material/modules/js/sidenav/sidenav.js',
            'angular-material/modules/js/tabs/tabs.js',
            'angular-material/modules/js/textField/textField.js',
            'angular-material/modules/js/radioButton/radioButton.js',
            'angular-material/modules/js/toolbar/toolbar.js',
            'angular-material/modules/js/virtualRepeat/virtualRepeat.js',
            'angular-material/modules/js/whiteframe/whiteframe.js',
            'angular-material/modules/js/dialog/dialog.js'
        ];
        var boilerplate = `
        (function(){
            angular.module("ngMaterial", [
"ng",
"ngAnimate",
"material.core",
"material.core.layout",
"material.core.theming.palette",
"material.core.theming",
"material.core.animate",
"material.components.backdrop",
"material.components.autocomplete",
"material.components.bottomSheet",
"material.components.button",
"material.components.checkbox",
"material.components.content",
"material.components.dialog",
"material.components.divider",
"material.components.icon",
"material.components.input",
"material.components.list",
"material.components.progressCircular",
"material.components.radioButton",
"material.components.select",
"material.components.sidenav",
"material.components.tabs",
"material.components.toolbar",
"material.components.virtualRepeat",
"material.components.whiteframe"

]);
})();
    `
            ;

        angularMatPath = 'app/bower_components/' + 'angular-material/';
        return gulp.src(modules, {cwd: 'app/bower_components/'})
            .pipe($.concat({path: 'angular-material.custom.js', cwd: ''}))
            .pipe($.insert.prepend(boilerplate))
            .pipe(gulp.dest(angularMatPath));
    });

    gulp.task('buildDep', ['buildM'], function () {
        var deps = [
            'angular-material/custom.js',
        ];
        return gulp.src(deps, {cwd: 'app/bower_components/'})
            .pipe($.concat({path: 'deps.min.js'}))
            .pipe($.uglify())
            .pipe(gulp.dest(angularMatPath));
    })


}
