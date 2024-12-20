const gulp = require('gulp');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concatCss = require('gulp-concat-css');
const browserSync = require('browser-sync').create();
const del = require('del');

gulp.task('clean', function () {
    return del(['dist/**/*']);
});

// Оптимізація зображень
gulp.task('images', () => {
    return gulp.src('development/images/**/*', { encoding: false })
      .pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
      .pipe(gulp.dest('dist/images'));
});

// Збирання та стискання стилів
gulp.task('vendorStyles', function () {
    return gulp.src(['development/css/**/*.css', 'development/css/bootstrap.css'], { allowEmpty: true })
        .pipe(plumber())
        .pipe(concatCss('vendor.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('styles', function () {
    return gulp.src('development/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/styles'));
});

// Збирання та стискання скриптів
gulp.task('vendorScripts', function () {
    return gulp.src(['development/scripts/*.js', 'development/scripts/bootstrap.js', 'development/scripts/jquery.js'],{ allowEmpty: true })
        .pipe(plumber())
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('scripts', function () {
    return gulp.src('development/index.js')
        .pipe(plumber())
        .pipe(concat('index.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

// Копіювання HTML
gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('dist'));
});

// Завдання для запуску браузер-сервера
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './dist'  // Вказуємо директорію, з якої буде працювати сервер
        }
    });

    gulp.watch(['dist/**/*']).on('change', browserSync.reload);  // Оновлюємо браузер при зміні файлів
});

// Завдання для спостереження
gulp.task('watch', function () {
    gulp.watch('development/css/**/*.css', gulp.series('vendorStyles'));
    gulp.watch('development/sass/**/*.scss', gulp.series('styles'));
    gulp.watch('development/scripts/**/*.js', gulp.series('vendorScripts'));
    gulp.watch('development/index.js', gulp.series('scripts'));
    gulp.watch('development/images/**/*.{png,jpg,jpeg,gif,svg}', gulp.series('images'));
    gulp.watch('*.html', gulp.series('html'));
});

// Завдання для збірки проекту
gulp.task('build', gulp.series(
    'clean', 
    gulp.parallel('images', 'vendorStyles', 'styles', 'vendorScripts', 'scripts', 'html')
));

// Завдання за замовчуванням
gulp.task('default', gulp.series('build', gulp.parallel('browserSync', 'watch')));