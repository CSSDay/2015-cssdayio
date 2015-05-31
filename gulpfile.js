var gulp        = require('gulp');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var connect = require('connect');
var serveStatic = require('serve-static');

/**
 * Server
 */
gulp.task('server', function() {
    connect().use(serveStatic(__dirname)).listen(8080);
    console.log('Connect on localhost:8080');
});

/**
 * JS
 */
 gulp.task('js', function() {
   return gulp.src([
         './vendor/jquery/dist/jquery.js',
         './vendor/jquery.countdown/dist/jquery.countdown.js',
         './scripts/src/**/*.js'
       ])
     .pipe(concat('build.js'))
     .pipe(gulp.dest('./scripts'))
     .pipe(uglify())
     .pipe(rename('build.min.js'))
     .pipe(gulp.dest('./scripts'))
 });

/**
 * Move normalize and renmave so it can be a sass partial
 */
gulp.task('normalize.css', function() {
    return gulp.src(['vendor/normalize.css/normalize.css'])
        .pipe(rename('_normalize.scss'))
        .pipe(gulp.dest('./scss/base/'));
});

/**
 * Sass
 */
gulp.task('sass', ['normalize.css'], function () {
    return gulp.src('./scss/main.scss')
        .pipe(sass({
            includePaths: ['scss']
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
    gulp.watch(['./vendor/*', './_scripts/src/**/*'], ['js']);
    gulp.watch(['./scss/**/*.scss', './vendor/normalize.css/normalize.css'], ['sass']);
});

gulp.task('default', ['watch', 'server']);