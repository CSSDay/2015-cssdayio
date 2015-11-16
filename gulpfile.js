'use strict';

var gulp        = require('gulp');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var del         = require('del');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var serve       = require('gulp-serve');

gulp.task('clean-vendor-js', function (cb) {
    del(['./build/build.js', './build/build.min.js']);
    cb();
});

gulp.task('clean-js', function (cb) {
    del(['./build/build.js', './build/build.min.js']);
    cb();
});

gulp.task('clean-css', function (cb) {
    del('./css/*');
    cb();
});

gulp.task('server', serve({
    root: ['.'],
    port: 8080
}));

gulp.task('vendor-js', ['clean-vendor-js'], function() {
    return gulp.src([
            './vendor/jquery/dist/jquery.js',
            './vendor/slick-carousel/slick/slick.js'
        ])
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('./build'))
    .pipe(uglify())
    .pipe(rename('vendors.min.js'))
    .pipe(gulp.dest('./build'))
});

gulp.task('js', ['clean-js'], function() {
    return gulp.src('./src/**/*.js')
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./build'))
    .pipe(uglify())
    .pipe(rename('build.min.js'))
    .pipe(gulp.dest('./build'))
});

gulp.task('sass', ['clean-css'], function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ['scss'],
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8']))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
    gulp.watch(['./vendor/*.js'], ['vendor-js']);
    gulp.watch(['./src/**/*.js'], ['js']);
    gulp.watch(['./scss/**/*.scss', './vendor/*.css'], ['sass']);
});

gulp.task('default', ['sass', 'vendor-js', 'js', 'watch', 'server']);