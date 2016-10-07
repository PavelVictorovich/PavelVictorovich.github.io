'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const stylus = require('gulp-stylus');
const del = require('del');
const browserSync = require('browser-sync').create();
const resolver = require('stylus').resolver;
const svgSprite = require('gulp-svg-sprite');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const notify = require('gulp-notify');
const combiner = require('stream-combiner2').obj;
const through2 = require('through2').obj;
const eslint = require('gulp-eslint');
const fs = require('fs');
const plumber = require('gulp-plumber');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const gulplog = require('gulplog');
const AssetsPlugin = require('assets-webpack-plugin');
const notifier = require('node-notifier');
const path = require('path');


gulp.task('apps', function () {
    return gulp.src('frontend/apps/**/*.**',{read:false})
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/apps'));
});

gulp.task('styles', function() {
    return gulp.src('frontend/styles/index.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/styles/'));
});

gulp.task('assets', function() {
    return gulp.src('frontend/assets/**/*.*', {since: gulp.lastRun('assets')})
        .pipe(gulp.dest('dist'));
});

gulp.task('webpack', function(callback) {
    let options = {
        context: __dirname + '/frontend',

        entry: [
            'babel-polyfill',
            './frontend/js/index'
        ],

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: 'bundle.js',
        },

        watch:   true,

        devtool: 'cheap-module-inline-source-map',

        module:  {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }]
        },

        plugins: [
            new webpack.NoErrorsPlugin()
        ]
    };

    options.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings:     false,
                unsafe:       true
            }
        }),
        new AssetsPlugin({
            filename: 'webpack.json',
            path:     __dirname + '/manifest',
            processOutput(assets) {
                for (let key in assets) {
                    assets[key + '.js'] = assets[key].js.slice(options.output.distPath.length);
                    delete assets[key];
                }
                return JSON.stringify(assets);
            }
        })
    );

    webpack(options, function(err, stats) {

        if (!err) {
            err = stats.toJson().errors[0];
        }
        if (err) {
            notifier.notify({
                title: 'Webpack',
                message: err
            });
            gulplog.error(err);
        } else {
            gulplog.info(stats.toString({
                colors: true
            }));
        }
        if (!options.watch && err) {
            callback(err);
        } else {
            callback();
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('dist/apps/**/*.**');
    gulp.watch(['frontend/styles/**/*.styl', 'tmp/styles/sprite.styl'], gulp.series('styles'));
    gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
    gulp.watch('frontend/styles/**/*.{png,jpg}', gulp.series('styles:assets'));
    gulp.watch('frontend/styles/**/*.svg', gulp.series('styles:svg'));

});

gulp.task('clean', function() {
    return del(['dist', 'manifest', 'tmp']);
});

gulp.task('build', gulp.series('clean', 'apps', gulp.parallel('styles', 'webpack'), 'assets'));

gulp.task('serve', function() {
    browserSync.init({
        server: 'dist'
    });
    browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('serve', function() {
    gulp.watch('frontend/apps/**/*.**', gulp.series('apps'));
    gulp.watch('frontend/styles/**/*.styl', gulp.series('styles'));
    gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
})));

gulp.task('lint', function() {
    let eslintResults = {};
    let cacheFilePath = process.cwd() + '/tmp/lintCache.json';

    try {
        eslintResults = JSON.parse(fs.readFileSync(cacheFilePath));
    } catch (e) {
    }

    return gulp.src('frontend/**/*.js', {read: false})
        .pipe(gulpIf(
            function(file) {
                return eslintResults[file.path] && eslintResults[file.path].mtime == file.stat.mtime.toJSON();
            },
            through2(function(file, enc, callback) {
                file.eslint = eslintResults[file.path].eslint;
                callback(null, file);
            }),
            combiner(
                through2(function(file, enc, callback) {
                    file.contents = fs.readFileSync(file.path);
                    callback(null, file);
                }),
                eslint(),
                through2(function(file, enc, callback) {
                    eslintResults[file.path] = {
                        eslint: file.eslint,
                        mtime: file.stat.mtime
                    };
                    callback(null, file);
                })
            )
        ))
        .on('end', function() {
            fs.writeFileSync(cacheFilePath, JSON.stringify((eslintResults)));
        })
        .pipe(eslint.failAfterError());
});