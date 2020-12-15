// Theme Name
var themeName = "_mytheme";

/**
 * Load Plugins
 * 
 */

var gulp = require('gulp');

// style plugins
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var cleanCSS = require("gulp-clean-css"); 
var autoprefixer = require('autoprefixer');

// image plugins
var imagemin = require('gulp-imagemin');

// script plugins
var webpack = require('webpack-stream');
var named = require('vinyl-named');

// utility plugins
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var zip = require('gulp-zip');

/**
 * Task: `styles` 
 * Compiles Sass, Autoprefixes, Minifies CSS
 * 
 */
gulp.task('styles', function() {
    return gulp.src(['src/css/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(
            postcss([
                autoprefixer({ 
                    grid: true
                })
            ])
        )
        .pipe(
            cleanCSS({
                compatibility:'ie8'
            })
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
 })

/**
 * Task: `images` 
 * Minifies PNG, JPEG, GIF and SVG images.
 * 
 */
gulp.task('images', function() {
    return gulp.src('src/img/**/*.{jpg,jpeg,png,svg,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
})

/**
 * Task: `clean` 
 * Clear all files in `dist` folder
 * 
 */
gulp.task('clean', function(done) {
    del(['dist'])
    done();
})

/**
 * Task: `scripts` 
 * Concatenate and minify scripts.
 * 
 */
gulp.task('scripts', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(named())
        .pipe(
            webpack({
                mode: 'production',
                devtool: 'source-map',
                output: {
                    filename: "[name].js"
                }
            })
        )
        .pipe(gulp.dest('dist/js'))
 })

 /**
 * Task: `zip` 
 * Zips theme and places in parent directory
 * 
 */
gulp.task('zip', function() {
    return gulp.src([
            "**/*",
            "!node_modules{,/**}",
            "!bundled{,/**}",
            "!src{,/**}",
            "!.babelrc",
            "!.gitignore",
            "!gulpfile.babel.js",
            "!package.json",
            "!package-lock.json",
        ])
        .pipe(zip(`${themeName}.zip`))
        .pipe(gulp.dest('./../'));
 })

 /**
 * Task: `copy` 
 * USE AS TEMPLATE: Copies other `src` files into `dist`
 * 
 */
// gulp.task('copy', function() {
//     return gulp.src(['src/**/*','!src/{images,js,scss}','!src/{images,js,scss}/**/*'])
//        .pipe(gulp.dest('dist'))
// })

  /**
 * Task: `watch` 
 * Watch for changes and reload
 * 
 * 
 */
 gulp.task('watch', function() {
    gulp.watch(
        'src/css/**/*.scss', 
        gulp.series('styles'));
    gulp.watch(
        'src/images/**/*.{jpg,jpeg,png,svg,gif}', 
        gulp.series('images'))
    gulp.watch(
        'src/js/**/*.js', 
        gulp.series('scripts'))
 })

/**
 * Main Commands
 * 
 */
 gulp.task('default', gulp.series('clean', 'styles', 'images', 'scripts', 'watch'))

 gulp.task('build', gulp.series('clean', 'styles', 'images', 'scripts', 'zip'))

 