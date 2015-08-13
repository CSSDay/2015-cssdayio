'use strict';

var gulp        = require('gulp');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var del         = require('del');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var serve       = require('gulp-serve');

gulp.task('clean-js', function (cb) {
    del('./build/*');
    cb();
});

gulp.task('clean-css', function (cb) {
    del('./css/*');
    cb();
});

gulp.task('clean-sass-vendors', function (cb) {
    del('./scss/vendors/*');
    cb();
});

gulp.task('server', serve({
    root: ['.'],
    port: 8080
}));

gulp.task('js', ['clean-js'], function() {
    return gulp.src([
            './vendor/jquery/dist/jquery.js',
            './vendor/slick-carousel/slick/slick.js',
            './src/**/*.js'
        ])
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./build'))
    .pipe(uglify())
    .pipe(rename('build.min.js'))
    .pipe(gulp.dest('./build'))
});

gulp.task('sass-convert-partials', ['clean-sass-vendors'], function() {
    gulp.src('vendor/normalize.css/normalize.css')
        .pipe(rename('_normalize.scss'))
        .pipe(gulp.dest('./scss/vendors/'));
    gulp.src('vendor/slick-carousel/slick/slick.css')
        .pipe(rename('_slick.scss'))
        .pipe(gulp.dest('./scss/vendors/'));
});

gulp.task('sass', ['clean-css', 'sass-convert-partials'], function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass({
            includePaths: ['scss'],
            errLogToConsole: true
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8']))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
    gulp.watch(['./src/**/*.js', './vendor/*.js'], ['js']);
    gulp.watch(['./scss/**/*.scss', './vendor/*.css'], ['sass']);
});

gulp.task('default', ['sass', 'js', 'watch', 'server']);