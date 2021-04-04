var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    addsrc = require('gulp-add-src'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require("gulp-rename");

/*CONFIG*/
var config = {
    'develop': false,
    'srcSCSSFolder': './scss',
    'mainSCSSFile': './scss/main.scss',
    'distCSSFolder': './css'
};

var onError = function (err) {
    notify.onError({
        title: "Gulp",
        subtitle: "Failure!",
        message: "Error: <%= error.message %>",
        sound: "Beep"
    })(err);

    this.emit('end');
};

/*SUBTASK*/

gulp.task('css', function () {
    console.log("css: " + config.distCSSFolder);
    gulp.src(config.mainSCSSFile)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulpif((config.develop === false), minifyCss()))
        .pipe(rename("style.css"))
        .pipe(gulp.dest(config.distCSSFolder));

});

/*WATCH*/
gulp.task('mainTask', ['css']);

gulp.task('dev', function () {
    config.develop = true;
    gulp.run('mainTask');
});

gulp.task('prod', function () {
    config.develop = false;
    gulp.run('mainTask');
});

gulp.task('watch', function () {

    gulp.run('dev');

    gulp.watch([config.srcSCSSFolder + '/**/*.scss'], function () {
        gulp.run('dev');
    });
});

gulp.task('default', ['watch']);