const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const watch = require('gulp-watch');
const rimraf = require('rimraf');

const path = {
    public: {
      html: 'front/public/',
      js: 'front/public/js/',
      css: 'front/public/css/',
      img: 'front/public/img/'
    },
    app: {
      html: 'front/app/*.html',
      js: 'front/app/js/**/*.js',
      sass: 'front/app/sass/**/*.scss',
      img: 'front/app/img/**/*.*'
    },
    watch: {
      html: 'front/app/**/*.html',
      js: 'front/app/js/**/*.js',
      sass: 'front/app/sass/**/*.scss',
      img: 'front/app/img/**/*.*'
    },
    clean: './front/public'
  };
  
  gulp.task('html', function() {
    gulp.src(path.app.html)
      .pipe(gulp.dest(path.public.html));
  });
  
  gulp.task('js', function() {
    gulp.src(path.app.js)
      .pipe(concat('script.js'))
      .pipe(gulp.dest(path.public.js));
  });
  
  gulp.task('sass', function() {
    gulp.src(path.app.sass)
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('style.css'))
      .pipe(gulp.dest(path.public.css));
  });
  
  gulp.task('img', function() {
    gulp.src(path.app.img)
      .pipe(imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
        svgoPlugins: [{removeViewBox: true}]
      }))
      .pipe(gulp.dest(path.public.img));
  });
  
  gulp.task('build', [
      'html',
      'js',
      'sass',
      'img'
  ]);
  
  gulp.task('watch', function() {
    watch([path.watch.html], function (event, cb) {
      gulp.start('html');
    });
    watch([path.watch.js], function (event, cb) {
      gulp.start('js');
    });
    watch([path.watch.sass], function (event, cb) {
      gulp.start('sass');
    });
    watch([path.watch.img], function (event, cb) {
      gulp.start('img');
    });
  });
  
  gulp.task('clean', function (cb) {
    return rimraf(path.clean, cb)
  });
  
  gulp.task('default', ['build', 'watch']);
  