'use strict';

const path = require('path');
const del = require('del');
const debug = require('gulp-debug');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync').create();
const resolver = require('stylus').resolver;
const svgSprite = require('gulp-svg-sprite');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const notify = require('gulp-notify');
const combiner = require('stream-combiner2').obj;
const through2 = require('through2').obj;
const eslint = require('gulp-eslint');
const fs = require('fs');
const plumber = require('gulp-plumber');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const named = require('vinyl-named');
const gulplog = require('gulplog');
const uglify = require('gulp-uglify');
const AssetsPlugin = require('assets-webpack-plugin');
const throttle = require('lodash.throttle');
const newer = require('gulp-newer');
const notifier = require('node-notifier');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function() {
    let resolve = resolver();
    let manifest;
    if (!isDevelopment) {
        manifest = require('./manifest/assets.json');
    }
    function url(urlLiteral) {
        urlLiteral = resolve.call(this, urlLiteral);
        for (let asset in manifest) {
            if (urlLiteral.val == `url("${asset}")`) {
                urlLiteral.string = urlLiteral.val = `url("${manifest[asset]}")`;
            }
        }
        return urlLiteral;
    }
    url.options = resolve.options;
    url.raw = true;
    return gulp.src('frontend/styles/index.styl')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Styles',
                message: err.message
            }))
        }))
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(stylus({
            import: process.cwd() + '/tmp/styles/sprite',
            define: {
                url: resolver()
            }
        }))
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulpIf(!isDevelopment, combiner(cssnano(), rev())))
        .pipe(gulp.dest('docs/styles'))
        .pipe(gulpIf(!isDevelopment, combiner(rev.manifest('css.json'), gulp.dest('manifest'))));
});

gulp.task('clean', function() {
    return del(['docs', 'tmp', 'manifest']);
});

gulp.task('assets', function() {
    return gulp.src('frontend/assets/**/*.*', {since: gulp.lastRun('assets')})
        .pipe(gulpIf(!isDevelopment, revReplace({
            manifest: gulp.src('manifest/css.json', {allowEmpty: true})
        })))
        .pipe(gulpIf(!isDevelopment, revReplace({
            manifest: gulp.src('manifest/webpack.json', {allowEmpty: true})
        })))
        .pipe(gulp.dest('docs'));
});

gulp.task('styles:assets', function() {
    return gulp.src('frontend/styles/**/*.{png,jpg}', {since: gulp.lastRun('styles:assets')})
        .pipe(gulpIf(!isDevelopment, rev()))
        .pipe(gulp.dest('docs/styles'))
        .pipe(gulpIf(!isDevelopment, combiner(rev.manifest('assets.json'), gulp.dest('manifest'))));
});

gulp.task('styles:svg', function() {
    return gulp.src('frontend/styles/**/*.svg')
        .pipe(svgSprite({
            mode: {
                css: {
                    dest:       '.',
                    bust:       !isDevelopment,
                    sprite:     'sprite.svg',
                    layout:     'vertical',
                    prefix:     '$',
                    dimensions: true,
                    render:     {
                        styl: {
                            dest: 'sprite.styl'
                        }
                    }
                }
            }
        }))
        .pipe(gulpIf('*.styl', gulp.dest('tmp/styles'), gulp.dest('docs/styles')));
});

gulp.task('webpack', function(callback) {
    let options = {
        entry:   {
            page: './frontend/js/page',
            page2: './frontend/js/page2'
        },
        output:  {
            path:     __dirname + '/docs/js',
            docsPath: '/js/',
            filename: isDevelopment ? '[name].js' : '[name]-[chunkhash:10].js'
        },
        watch:   isDevelopment,
        devtool: isDevelopment ? 'cheap-module-inline-source-map' : null,
        module:  {
            loaders: [{
                test:    /\.js$/,
                include: path.join(__dirname, "frontend"),
                loader:  'babel?presets[]=es2015'
            }]
        },
        plugins: [
            new webpack.NoErrorsPlugin()
        ]
    };
    if (!isDevelopment) {
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
                        assets[key + '.js'] = assets[key].js.slice(options.output.docsPath.length);
                        delete assets[key];
                    }
                    return JSON.stringify(assets);
                }
            })
        );
    }
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
    gulp.watch(['frontend/styles/**/*.styl', 'tmp/styles/sprite.styl'], gulp.series('styles'));
    gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
    gulp.watch('frontend/styles/**/*.{png,jpg}', gulp.series('styles:assets'));
    gulp.watch('frontend/styles/**/*.svg', gulp.series('styles:svg'));
});

gulp.task('clean', function() {
    return del(['docs', 'manifest', 'tmp']);
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles:assets', 'styles', 'webpack'), 'assets'));

gulp.task('serve', function() {
    browserSync.init({
        server: 'docs'
    });
    browserSync.watch('docs/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('serve', function() {
    gulp.watch('frontend/styles/**/*.styl', gulp.series('styles'));
    gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
    gulp.watch('frontend/styles/**/*.{svg,png}', gulp.series('styles:assets'));
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
