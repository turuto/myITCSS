var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    wait = require('gulp-wait'),
    rename = require("gulp-rename");

/*CONFIG*/
var config = {};
config.activeTheme = 'css';
config.develop = true;
config.srcSCSSFolder = `./scss`;
config.mainSCSSFile = `${config.srcSCSSFolder}/main.scss`;
config.mainSCSSFile_dev = `${config.srcSCSSFolder}/main.scss`;
config.distCSSFolder = `./${config.activeTheme}`;

var onError = function (err) {
    notify.onError({
        title: 'Gulp',
        subtitle: 'Failure!',
        message: 'Error: <%= error.message %>',
        sound: 'Beep'
    })(err);

    this.emit('end');
};

/*SUBTASK*/
gulp.task('css', () => {
    console.log(`Executing CSS task on '${config.distCSSFolder}' - isDevelop: ${config.develop}`);
    let entryFile = config.develop ? config.mainSCSSFile_dev : config.mainSCSSFile;
    // if (config.develop) {
    //     entryFile = config.mainSCSSFile_dev;
    // } else {
    //     entryFile = config.mainSCSSFile;
    // }
    return new Promise((resolve, reject) => {
        return gulp.src(entryFile)
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(wait(200))
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(gulpif((config.develop === false), minifyCss()))
            .pipe(rename('style.css'))
            .pipe(gulp.dest(config.distCSSFolder))
            .on('error', reject)
            .on('end', resolve);
    });
});

setDevelop = async () => {
    config.develop = true;
};

setProd = async () => {
    config.develop = false;
};

gulp.task('dev', gulp.series(setDevelop, 'css'));

gulp.task('prod', gulp.series(setProd, 'css'));

function watch() {
    const folder = `${config.srcSCSSFolder}/**/*.scss`;
    gulp.watch(folder, gulp.parallel('css'));
}

gulp.task('watch', gulp.series('css', watch));

gulp.task('default', gulp.series('watch'));