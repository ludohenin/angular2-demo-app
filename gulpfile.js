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
    src: {
        index: './src/index.html',
        ts: ['./src/ts/**', './typings/**'],
        templates: './src/templates/**',
        css: './src/css/**',
        flux: './src/flux.js',
        lib: [
            './node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
            './node_modules/angular2/node_modules/zone.js/dist/zone.js',
            './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js',
            './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js.map',
            './node_modules/reflect-metadata/Reflect.js',
            './node_modules/reflect-metadata/Reflect.js.map',
            './node_modules/systemjs/dist/system.js'
        ],
    },
    dest: {
        index: './dist',
        ts: './dist/js',
        templates: './dist/templates',
        css: './dist/css',
        flux: './dist/lib',
        lib: './dist/lib',
    }
};

// ---------------------------- Main gulp tasks --------------------------------

gulp.task('build', function (done) {
    runSequence('clean', ['build:lib', 'build:js', 'build:templates', 'build:css', 'build:index'], done);
});

gulp.task('serve', ['build:js', 'build:templates', 'build:css', 'build:index'], function () {
    gulp.watch(PATH.src.ts, ['build:js']);
    gulp.watch(PATH.src.templates, ['build:templates']);
    gulp.watch(PATH.src.css, ['build:css']);
    gulp.watch(PATH.src.index, ['build:index']);

    var params = {
        port: 8080,
        host: "localhost",
        root: "./dist",
        open: false
    };
    liveServer.start(params);
});

// -----------------------------------------------------------------------------

gulp.task('clean:lib', function (done) {
    del([PATH.dest.lib], done);
});

gulp.task('clean:js', function (done) {
    del([PATH.dest.ts], done);
});

gulp.task('clean:templates', function (done) {
    del([PATH.dest.templates], done);
});

gulp.task('clean:css', function (done) {
    del([PATH.dest.css], done);
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
    builder.build('angular2/router', PATH.dest.lib + '/router.js', {});
    return builder.build('angular2/angular2', PATH.dest.lib + '/angular2.js', {});
});

// TODO: improve build.
gulp.task('build:flux', function() {
    return gulp.src(PATH.src.flux)
        .pipe(gulp.dest(PATH.dest.flux));
});

gulp.task('build:lib', ['build:flux', 'build:angular2'], function () {
    gulp.src(PATH.src.lib)
        .pipe(gulp.dest(PATH.dest.lib));
});

var tsProject = ts.createProject('tsconfig.json', {
    typescript: require("typescript")
});

gulp.task('build:js', ['clean:js'], function () {
    var result = gulp.src(PATH.src.ts)
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(ts(tsProject));

    return result.js
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(PATH.dest.ts));
});

gulp.task('build:templates', ['clean:templates'], function () {
    gulp.src(PATH.src.templates)
        .pipe(gulp.dest(PATH.dest.templates));
});

gulp.task('build:css', ['clean:css'], function () {
    gulp.src(PATH.src.css)
        .pipe(gulp.dest(PATH.dest.css));
});

gulp.task('build:index', function () {
    gulp.src(PATH.src.index)
        .pipe(gulp.dest(PATH.dest.index));
});