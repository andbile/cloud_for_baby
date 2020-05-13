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
    imageminPngquant = require('imagemin-pngquant'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),

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
        copy_lib: 'src/libs/**/*.*',
        copy_files: ['src/libs/**/*.*', 'src/fonts/*.*'/*, 'src/img/!**!/!*.*', '!src/img/sprite_png/!**', '!src/img/sprite_svg/!**'*/]

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


var newPathImg;
gulp.task('copyImg', function () {
    return gulp.src(path.src.copy_img)
        .on('data', function (file) {
            let path  = file.base;
            newPathImg = path.replace('src', 'build');
        })

        .pipe(changed(newPathImg + '', {hasChanged: changed.compareLastModifiedTime}))

        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
          /*  imagemin.optipng({optimizationLevel: 5, bitDepthReduction: true}),*/
            imagemin.svgo({
                plugins: [
                    {removeViewBox: false},
                    {cleanupIDs: false}
                ]
            })
        ]))


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

//var newPathLibs;
gulp.task('copyLib', function () {
    return gulp.src(path.src.copy_lib)
        /*.on('data', function (file) {
            let path  = file.base;
            newPathLibs = path.replace('src', 'build');
        })*/

        .pipe(gulp.dest(function(file){
        let path  = file.base;
        console.log(path);
        return path.replace('src', 'build');
    }));
});



gulp.task('clean', function () {
    return del(path.clean);
});



function getSvgSprite(callback) {
    gulp.src('src/img/sprite/*.svg')
        .pipe(gulpSvgSprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg"  //sprite file name
                }
            }
        }))
        .pipe(gulp.dest('src/img'));

    callback();
}

function getPngSprite(callback){
    let spriteData =
        gulp.src('./src/img/sprite_png/*.*') // путь, откуда берём картинки для спрайта
        .pipe(pngSprite({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            cssFormat: 'css',
            algorithm: 'left-right',
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

