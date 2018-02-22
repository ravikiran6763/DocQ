var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var gulploadPlugins = require('gulp-load-plugins');
var requireDir = require('require-dir');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');

var tasks = requireDir('./tasks');

var plugins = gulploadPlugins();

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'scripts', 'compress']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'));
    //.on('end', done);
});

var gulpIf = require('gulp-if'),
    jshintStylish = require('jshint-stylish');

var plugins = gulploadPlugins();
var config = require('./tasks/config');

gulp.task('scripts', function () {

    console.log(config.notify.update('\n--------- Running SCRIPT tasks -----------------------------------------\n'));
    return gulp.src([
        config.source.components + '/*.js', 
        config.source.components + '/controller/*.js', config.source.components + '/controller/**/*.js',
        config.source.components + '/service/*.js', config.source.components + '/service/**/*.js'])
    //, ',  ]
        //.pipe(plugins.jshint('.jshintrc'))
        //.pipe(plugins.jshint.reporter(jshintStylish))
        .pipe(plugins.concat('application.js'))
        //.pipe(gulpIf(config.production, plugins.uglify()))
        .pipe(plugins.size())
        .pipe(gulp.dest(config.build.js));
});

gulp.task('compress', function() {
  gulp.src('www/js/build/js/application.js')
    .pipe(minify({
        ext:{
            src:'-debug.min.js',
            min:'.js'
        },
        compress: true,
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(uglify())
    .pipe(plugins.size())
    .pipe(gulp.dest(config.build.js))
});

// GULP: HELPERS :: List all gulp plugin tasks
gulp.task('help', plugins.taskListing);

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

