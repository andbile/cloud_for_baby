'use strict';
const gulp = require ('gulp'),
    eslint = require('gulp-eslint'),
    fileInclude = require('gulp-file-include'),
    bs = require('browser-sync').create(),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    //concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    //debug = require('gulp-debug'),
    //notify = require('gulp-notify');
    gulpSvgSprite = require('gulp-svg-sprite');


const path = {
    // folder where the finished files are added
    build: {
        html: 'build/',
        css: 'build/css',
        js: 'build/js'
    },
    // folder where to get files
    src: {
        html: 'src/[^_]*.html',
        style: 'src/css/scss/main.scss',
        js: 'src/js/main.js',
        copy_img: 'src/img/*.*',
        copy_font: 'src/fonts/*.*',
        copy_lib: 'src/libs/*.*',
        copy_files: ['src/libs/*.*', 'src/fonts/*.*', 'src/img/*.*']

    },
    // watching files
    watch: {
        html: 'src/**/*.html',
        style: 'src/css/scss/**/*.scss',
        js: 'src/js/**/*.js',
        img:'src/img/*.*',
        fonts:'src/fonts/*.*',
        lib:'src/libs/*.*',
        copy_files: ['src/libs/**/*.*', 'src/fonts/**/*.*', 'src/img/*.*']
    },
    browserSyncWatch:'build/**/*.*',
    clean: ['./build/**', '!./build']
};




gulp.task('html', function () {
    return gulp.src(path.src.html)
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(path.build.html));
});

gulp.task('styles', function () {
    return gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('/', {
            sourceMappingURLPrefix: ''}))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('scripts', function () {
    return gulp.src(path.src.js)
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(eslint())
        .pipe(eslint.format())// вывод ошибок
        /*.pipe(eslint.failAfterError())*/
        // .pipe(concat('main.js'))
        .pipe(gulp.dest(path.build.js));
});

// копирование файлов в build
gulp.task('copyFiles', function () {
    return gulp.src(path.src.copy_files)
        .pipe(gulp.dest(function(file){
            let path  = file.base;
            console.log(path);
            return path.replace('src', 'build');
        }));
});

gulp.task('copyImg', function () {
    return gulp.src(path.src.copy_img)
        .pipe(gulp.dest(function(file){
            let path  = file.base;
            console.log(path);
            return path.replace('src', 'build');
        }));
});

gulp.task('copyFont', function () {
    return gulp.src(path.src.copy_font)
        .pipe(gulp.dest(function(file){
            let path  = file.base;
            console.log(path);
            return path.replace('src', 'build');
        }));
});

gulp.task('copyLib', function () {
    return gulp.src(path.src.copy_lib)
        .pipe(gulp.dest(function(file){
            let path  = file.base;
            console.log(path);
            return path.replace('src', 'build');
        }));
});



gulp.task('clean', function () {
    return del(path.clean);
});

function getSvgSprite() {
    return gulp.src('src/img/sprite/*.svg')
        .pipe(gulpSvgSprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg"  //sprite file name
                }
            }
        }))
        .pipe(gulp.dest('src/img'))
}



function browserSync(){
    bs.init({
        server: {
            baseDir: path.build.html
        }
    });

    gulp.watch(path.browserSyncWatch).on('change', bs.reload);
}


function watch(){
    gulp.watch(path.watch.html, gulp.series('html'));
    gulp.watch(path.watch.style, gulp.series('styles'));
    gulp.watch(path.watch.js, gulp.series('scripts'));

    gulp.watch(path.watch.img, gulp.series('copyImg'));
    gulp.watch(path.watch.fonts, gulp.series('copyFont'));
    gulp.watch(path.watch.lib, gulp.series('copyLib'));
}


// default task
exports.default = gulp.series('clean', gulp.parallel('html', 'styles', 'scripts', 'copyFiles'), gulp.parallel(watch, browserSync));

exports.sprite = gulp.parallel(getSvgSprite);

