'use strict';

var gulp = require('gulp');
var del = require('del');
var Builder = require('systemjs-builder');
var ts = require('gulp-typescript');
var plumber = require('gulp-plumber');
var runSequence = require('gulp-run-sequence');
var liveServer = require('live-server');
var sourceMaps = require('gulp-sourcemaps');

var PATH = {
    index: {
        src: './src/index.html',
        dest: './dist'
    },
    lib: {
        src: [
            './node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
            './node_modules/angular2/node_modules/zone.js/dist/zone.js',
            './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js',
            './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js.map',
            './node_modules/reflect-metadata/Reflect.js',
            './node_modules/reflect-metadata/Reflect.js.map',
            './node_modules/systemjs/dist/system.js'
        ],
        dest: './dist/lib'
    },
    ts: {
        src: ['./src/ts/**', './typings/**'],
        dest: './dist/js'
    },
    templates: {
        src: './src/templates/**',
        dest: './dist/templates',
    },
    css: {
        src: './src/css/**',
        dest: './dist/css'
    }
}

gulp.task('clean:lib', function (done) {
    del([PATH.lib.dest], done);
});

gulp.task('clean:js', function (done) {
    del([PATH.ts.dest], done);
});

gulp.task('clean:templates', function (done) {
    del([PATH.templates.dest], done);
});

gulp.task('clean:css', function (done) {
    del([PATH.css.dest], done);
});

gulp.task('clean', ['clean:lib', 'clean:js', 'clean:templates', 'clean:css']);


gulp.task('build:angular2', function () {
    var builder = new Builder({
        paths: {
            'angular2/*': 'node_modules/angular2/es6/prod/*.es6',
            rx: 'node_modules/angular2/node_modules/rx/dist/rx.js'
        },
        meta: {
            rx: {
                format: 'cjs'
            }
        }
    });
    builder.build('angular2/router', PATH.lib.dest + '/router.js', {});
    return builder.build('angular2/angular2', PATH.lib.dest + '/angular2.js', {});
});

gulp.task('build:lib', ['build:angular2'], function () {
    gulp.src(PATH.lib.src)
        .pipe(gulp.dest(PATH.lib.dest));
});

var tsProject = ts.createProject('tsconfig.json', {
    typescript: require("typescript")
});

gulp.task('build:js', ['clean:js'], function () {
    var result = gulp.src(PATH.ts.src)
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(ts(tsProject));

    return result.js
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(PATH.ts.dest));
});

gulp.task('build:templates', ['clean:templates'], function () {
    gulp.src(PATH.templates.src)
        .pipe(gulp.dest(PATH.templates.dest));
});

gulp.task('build:css', ['clean:css'], function () {
    gulp.src(PATH.css.src)
        .pipe(gulp.dest(PATH.css.dest));
});

gulp.task('build:index', function () {
    gulp.src(PATH.index.src)
        .pipe(gulp.dest(PATH.index.dest));
});

gulp.task('build', function (done) {
    runSequence('clean', ['build:lib', 'build:js', 'build:templates', 'build:css', 'build:index'], done);
});

gulp.task('serve', ['build:js', 'build:templates', 'build:css', 'build:index'], function () {
    gulp.watch(PATH.ts.src, ['build:js']);
    gulp.watch(PATH.templates.src, ['build:templates']);
    gulp.watch(PATH.css.src, ['build:css']);
    gulp.watch(PATH.index.src, ['build:index']);

    var params = {
        port: 8080,
        host: "localhost",
        root: "./dist",
        open: false
    };
    liveServer.start(params);
});
