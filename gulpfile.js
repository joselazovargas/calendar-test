var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var rupture = require('rupture');
var pug = require('pug');

//carga todos los plugins que comiencen con gulp-*
var $ = require('gulp-load-plugins')();

// Static Server + watching scss/html files
gulp.task('serve', ['copy-seo','images','stylus', 'scripts','pug'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch('./app/js/main.js', ['scripts']);
    gulp.watch('./app/**/*.pug', ['pug']);
    gulp.watch('./app/stylus/*.styl', ['stylus-watch']);
});

// copy initial only files
gulp.task('copy-seo', function () {
    return gulp.src(['./app/*.xml','./app/*.txt'])
        .pipe(gulp.dest('./dist/'));
    });

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('stylus-watch', ['stylus'], function (done) {
    browserSync.reload();
    done();
});

// compila archivos stylus hacia la carpeta css
gulp.task('stylus', function () {
    var processors = [
            require('autoprefixer')({browsers: ['last 1 version']})
        ];
    return gulp.src('./app/stylus/style.styl')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.stylus({
            use: [
                rupture()
            ]
        }))
        .pipe($.postcss(processors))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'));
    });

gulp.task('scripts', function(){
      return gulp.src('./app/js/main.js')
        .pipe($.rename({suffix: '.min'}))
        .pipe($.uglify())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.stream());
    });

gulp.task('images', function(){
  gulp.src('app/img/**/*')
    .pipe($.cache($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('pug', function() {
  gulp.src('./app/**/*.pug')
    .pipe($.plumber())
    .pipe($.pug({
        pretty: true
        }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
