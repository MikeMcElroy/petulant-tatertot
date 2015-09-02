var gulp = require('gulp');
var babel = require('gulp-babel');
var mergeStream = require('merge-stream');
var htmlReplace = require('gulp-html-replace');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rimraf = require('rimraf');
var sourcemaps = require('gulp-sourcemaps');

var libs = ['lib/browser-polyfill.min.js', 'lib/angular.min.js'];
gulp.task('clean:build', function(cb) {
  rimraf('build/', cb);
});

gulp.task('clean:dist', function(cb) {
  rimraf('dist/', cb);
});

gulp.task('build:dist', ['clean:dist'], function() {
    return mergeStream(
      mergeStream(
        gulp.src(libs, { base: '.' }),
        gulp.src('src/**/*.js')
          .pipe(babel())
          .pipe(concat('temp'))
          .pipe(uglify())
      ).pipe(concat('bundle.min.js')),
      gulp.src('src/index.html')
        .pipe(htmlReplace({
          js: 'bundle.min.js'
        }))
    )
      .pipe(gulp.dest('dist/'));
});

gulp.task('build:src', ['clean:build'], function() {
  return mergeStream(
    gulp.src(libs, { base: '.' }),
    gulp.src('src/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(sourcemaps.write()),
    gulp.src('src/index.html')
  ).pipe(gulp.dest('build/'));
});

gulp.task('build:tests', function() {
    return gulp.src(['tests/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('playground/'));
});

gulp.task('build', ['build:src', 'build:tests']);

gulp.task('watch', function() {
    return gulp.watch(['src/**/*.js', 'tests/**/*.spec.js', 'src/index.html'], ['build']);
});
