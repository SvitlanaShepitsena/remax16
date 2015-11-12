'use strict'
var del = require('del');

exports.run = function (gulp,$,_) {

    gulp.task('stat:clean', function () {

        return del('./stat')
    });

    gulp.task('stat', ['stat:clean'],function () {

            return gulp.src('app/index.html')
                .pipe($.resources())
                .pipe(gulp.dest('./stat'));
        });


}
