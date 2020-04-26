'use strict';
const gulp = require ('gulp'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),

    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),

    pngSprite = require('gulp.spritesmith'),
    gulpSvgSprite = require('gulp-svg-sprite'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),

    fileInclude = require('gulp-file-include'),
    sourcemaps = require('gulp-sourcemaps'),
    bs = require('browser-sync').create(),
    del = require('del'),
    changed = require('gulp-changed');
   /* cache = require('gulp-cache');*/


const path = {
    // folder where the finished files are added
    build: {
        html: './build/',
        css: './build/css',
        js: './build/js'
    },
    // folder where to get files
    src: {
        html: 'src/[^_]*.html',
        style: 'src/styles/main.scss',
        js: 'src/js/main.js',
        copy_img: ['src/img/**/*.*', '!src/img/sprite_png/**', '!src/img/sprite_svg/**'],
        copy_font: 'src/fonts/*.*',
        copy_lib: 'src/libs/*.*',
        copy_files: ['src/libs/*.*', 'src/fonts/*.*'/*, 'src/img/!**!/!*.*', '!src/img/sprite_png/!**', '!src/img/sprite_svg/!**'*/]

    },
    // watching files
    watch: {
        html: 'src/**/*.html',
        style: 'src/styles/**/*.scss',
        js: 'src/js/**/*.js',
        img:['src/img/**/*.*', '!src/img/sprite_png/**', '!src/img/sprite_svg/**'],
        fonts:'src/fonts/*.*',
        lib:'src/libs/*.*'
      /*  copy_files: ['src/libs/!**!/!*.*', 'src/fonts/!**!/!*.*', 'src/img/!*.*']*/
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
        .pipe(autoprefixer({
            cascade: true
        }))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('../maps/', {
            sourceMappingURLPrefix: ''}))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('scripts', function () {
    return gulp.src(path.src.js)

        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(sourcemaps.init())
        .pipe(eslint())
        .pipe(eslint.format())// вывод ошибок
        /*.pipe(eslint.failAfterError())*/
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(sourcemaps.write('../maps/', {
            sourceMappingURLPrefix: ''}))
        .pipe(gulp.dest(path.build.js));
});

// копирование файлов в build
gulp.task('copyFiles', function () {
    return gulp.src(path.src.copy_files)
        .pipe(gulp.dest(function(file){
            let path  = file.base;
            return path.replace('src', 'build');
        }));
});


var newPath;
gulp.task('copyImg', function (callback) {

    gulp.src(path.src.copy_img)
        .on('data', function (file) {
            let path  = file.base;
            newPath = path.replace('src', 'build');
        })

        .pipe(changed(newPath + '', {hasChanged: changed.compareLastModifiedTime}))

        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant({quality: '65-70', speed: 5})]
        }))

        .pipe(gulp.dest(function(file){
            let path  = file.base;
            console.log(path);
            return path.replace('src', 'build');
        }));

    callback();
});

gulp.task('copyFont', function () {
    return gulp.src(path.src.copy_font, {since:gulp.lastRun('copyFont')})
        .pipe(gulp.dest(function(file){
            let path  = file.base;
            console.log(path);
            return path.replace('src', 'build');
        }));
});

gulp.task('copyLib', function () {
    return gulp.src(path.src.copy_lib, {since:gulp.lastRun('copyLib')})
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

function getPngSprite(callback){
    let spriteData =
        gulp.src('./src/img/sprite_png/*.*') // путь, откуда берём картинки для спрайта
        .pipe(pngSprite({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            cssFormat: 'css',
            algorithm: 'binary-tree',
            cssTemplate: 'scss.template.mustache'
        }));

    spriteData.img.pipe(gulp.dest('./src/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./src/styles/')); // путь, куда сохраняем стили

    callback();
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
    gulp.watch(path.watch.html, {usePolling: true}, gulp.series('html'));
    gulp.watch(path.watch.style, {usePolling: true}, gulp.series('styles'));
    gulp.watch(path.watch.js, {usePolling: true}, gulp.series('scripts'));

    gulp.watch(path.watch.img, gulp.series('copyImg'));
    gulp.watch(path.watch.fonts, gulp.series('copyFont'));
    gulp.watch(path.watch.lib, gulp.series('copyLib'));
}


// default task
exports.default = gulp.series('clean', gulp.parallel('html', 'styles', 'scripts', 'copyFiles', 'copyImg'), gulp.parallel(watch, browserSync));

exports.spriteSvg = gulp.parallel(getSvgSprite);
exports.spritePng = gulp.parallel(getPngSprite);

