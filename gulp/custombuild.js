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

    gulp.task('bms', function () {
        var modules = [
            'angular-material/modules/css/angular-material-layouts.css',
            'angular-material/modules/js/backdrop/backdrop.css',
            'angular-material/modules/js/divider/divider.css',
            'angular-material/modules/js/autocomplete/autocomplete.css',
            'angular-material/modules/js/bottomSheet/bottomSheet.css',
            'angular-material/modules/js/button/button.css',
            'angular-material/modules/js/checkbox/checkbox.css',
            'angular-material/modules/js/content/content.css',
            'angular-material/modules/js/dialog/dialog.css',
            'angular-material/modules/js/progressCircular/progressCircular.css',
            'angular-material/modules/js/icon/icon.css',
            'angular-material/modules/js/input/input.css',
            'angular-material/modules/js/list/list.css',
            'angular-material/modules/js/select/select.css',
            'angular-material/modules/js/sidenav/sidenav.css',
            'angular-material/modules/js/tabs/tabs.css',
            'angular-material/modules/js/textField/textField.css',
            'angular-material/modules/js/radioButton/radioButton.css',
            'angular-material/modules/js/toolbar/toolbar.css',
            'angular-material/modules/js/virtualRepeat/virtualRepeat.css',
            'angular-material/modules/js/whiteframe/whiteframe.css',
            'angular-material/modules/js/dialog/dialog.css' +
            ''];
        var boilerplate = `
        /*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.0.0-rc3-master-fe84405
 */
html, body {
  height: 100%;
  color: rgba(0, 0, 0, 0.87);
  background: white;
  position: relative; }

body {
  margin: 0;
  padding: 0; }

[tabindex='-1']:focus {
  outline: none; }

.inset {
  padding: 10px; }

button.md-no-style {
  font-weight: normal;
  background-color: inherit;
  text-align: left;
  border: none;
  padding: 0;
  margin: 0; }

select, button, textarea, input {
  vertical-align: baseline; }

input[type="reset"], input[type="submit"], html input[type="button"], button {
  cursor: pointer;
  -webkit-appearance: button; }
  input[type="reset"][disabled], input[type="submit"][disabled], html input[type="button"][disabled], button[disabled] {
    cursor: default; }

textarea {
  vertical-align: top;
  overflow: auto; }

input[type="search"] {
  -webkit-appearance: textfield;
  box-sizing: content-box;
  -webkit-box-sizing: content-box; }
  input[type="search"]::-webkit-search-decoration, input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none; }

.md-visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  text-transform: none;
  width: 1px; }

.md-shadow {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: inherit;
  pointer-events: none; }

.md-shadow-bottom-z-1 {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); }

.md-shadow-bottom-z-2 {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4); }

.md-shadow-animated.md-shadow {
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1); }

/*
 * A container inside of a rippling element (eg a button),
 * which contains all of the individual ripples
 */
.md-ripple-container {
  pointer-events: none;
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.55s cubic-bezier(0.25, 0.8, 0.25, 1); }

.md-ripple {
  position: absolute;
  -webkit-transform: translate(-50%, -50%) scale(0);
          transform: translate(-50%, -50%) scale(0);
  -webkit-transform-origin: 50% 50%;
          transform-origin: 50% 50%;
  opacity: 0;
  border-radius: 50%; }
  .md-ripple.md-ripple-placed {
    transition: margin 0.9s cubic-bezier(0.25, 0.8, 0.25, 1), border 0.9s cubic-bezier(0.25, 0.8, 0.25, 1), width 0.9s cubic-bezier(0.25, 0.8, 0.25, 1), height 0.9s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.9s cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-transform 0.9s cubic-bezier(0.25, 0.8, 0.25, 1);
    transition: margin 0.9s cubic-bezier(0.25, 0.8, 0.25, 1), border 0.9s cubic-bezier(0.25, 0.8, 0.25, 1), width 0.9s cubic-bezier(0.25, 0.8, 0.25, 1), height 0.9s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.9s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.9s cubic-bezier(0.25, 0.8, 0.25, 1); }
  .md-ripple.md-ripple-scaled {
    -webkit-transform: translate(-50%, -50%) scale(1);
            transform: translate(-50%, -50%) scale(1); }
  .md-ripple.md-ripple-active, .md-ripple.md-ripple-full, .md-ripple.md-ripple-visible {
    opacity: 0.20; }

.md-padding {
  padding: 8px; }

.md-margin {
  margin: 8px; }

.md-scroll-mask {
  position: absolute;
  background-color: transparent;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; }
  .md-scroll-mask > .md-scroll-mask-bar {
    display: block;
    position: absolute;
    background-color: #fafafa;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 65;
    box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.3); }

@media (min-width: 600px) {
  .md-padding {
    padding: 16px; } }

html, body {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  min-height: 100%;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; }

/************
 * Headings
 ************/
.md-display-4 {
  font-size: 112px;
  font-weight: 300;
  letter-spacing: -0.01em;
  line-height: 112px; }

.md-display-3 {
  font-size: 56px;
  font-weight: 400;
  letter-spacing: -0.005em;
  line-height: 56px; }

.md-display-2 {
  font-size: 45px;
  font-weight: 400;
  line-height: 64px; }

.md-display-1 {
  font-size: 34px;
  font-weight: 400;
  line-height: 40px; }

.md-headline {
  font-size: 24px;
  font-weight: 400;
  line-height: 32px; }

.md-title {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.005em; }

.md-subhead {
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 24px; }

/************
 * Body Copy
 ************/
.md-body-1 {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 20px; }

.md-body-2 {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 24px; }

.md-caption {
  font-size: 12px;
  letter-spacing: 0.02em; }

.md-button {
  letter-spacing: 0.01em; }

/************
 * Defaults
 ************/
button, select, html, textarea, input {
  font-family: Roboto, 'Helvetica Neue', sans-serif; }

select, button, textarea, input {
  font-size: 100%; }
    `
            ;

        angularMatPath = 'app/bower_components/' + 'angular-material/';
        return gulp.src(modules, {cwd: 'app/bower_components/'})
            .pipe($.concat({path: 'angular-material.custom.css', cwd: ''}))
            .pipe($.insert.prepend(boilerplate))
            .pipe(gulp.dest(angularMatPath),{overwrite:true});
    });


}
