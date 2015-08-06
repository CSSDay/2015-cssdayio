'use strict';

var gulp        = require('gulp');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var minifyCss   = require('gulp-minify-css');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var serve       = require('gulp-serve');

/**
 * Server
 */
gulp.task('server', serve({
  root: ['.'],
  port: 8080
}));

/**
 * JS
 */
 gulp.task('js', function() {
   return gulp.src([
         './vendor/jquery/dist/jquery.js',
         './vendor/slick-carousel/slick/slick.js',
         './src/**/*.js'
       ])
     .pipe(concat('build.js'))
     .pipe(gulp.dest('./build'))
     // .pipe(uglify())
     // .pipe(rename('build.min.js'))
     // .pipe(gulp.dest('./scripts'))
 });

/**
 * Sass
 */
gulp.task('sass', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass({
            includePaths: ['scss'],
            errLogToConsole: true
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8']))
        .pipe(gulp.dest('./css'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        //.pipe(rename('main.min.css'))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
    gulp.watch(['./vendor/*', './src/**/*.js'], ['js']);
    gulp.watch(['./scss/**/*.scss', './vendor/normalize.css/normalize.css'], ['sass']);
});

gulp.task('default', ['sass', 'js', 'watch', 'server']);