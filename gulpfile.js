var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');

gulp.task('default', function() {
  livereload.listen();
  gulp.watch('sass/*.scss', gulp.series('sass'));
  gulp.watch('**/*.(php|svg|js)').on('change', livereload.reload);
});

gulp.task('sass', function() {
  return gulp.src('./sass/base.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./', {
      includeContent: false,
      sourceRoot: '../sass'
    }))
    .pipe(gulp.dest('./css'));
});
