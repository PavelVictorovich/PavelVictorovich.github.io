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
const webpackStream = require('webpack-stream'); // Gulp + Webpack = ♡
const webpack = webpackStream.webpack;
const named = require('vinyl-named');
const gulplog = require('gulplog');
const uglify = require('gulp-uglify');
const AssetsPlugin = require('assets-webpack-plugin');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function() {
    return gulp.src('frontend/styles/index.styl')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title:   'Styles',
                message: err.message
            }))
        }))
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(stylus({
            define: {
                url: resolver()
            }
        }))
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulpIf(!isDevelopment, combiner(cssnano(), rev())))
        .pipe(gulp.dest('public/styles'))
        .pipe(gulpIf(!isDevelopment, combiner(rev.manifest('css.json'), gulp.dest('manifest'))));

});

gulp.task('styles:svg', function() {
    return gulp.src('frontend/styles/**/*.svg')
        .pipe(svgSprite({
            mode: {
                css: {
                    dest:       '.', // where to put style && sprite, default: 'css'
                    bust:       false,
                    sprite:     'sprite.svg', // filename for sprite relative to dest
                    layout:     'vertical',
                    prefix:     '$', // .svg-
                    dimensions: true,
                    render:     {
                        styl: {
                            dest: 'sprite.styl'  // filename for .styl relative to dest^
                        }
                    }
                }
            }
        }))
        .pipe(debug({title: 'styles:svg'}))
        .pipe(gulpIf('*.styl', gulp.dest('tmp/styles'), gulp.dest('public/styles')));
});

gulp.task('clean', function() {
    return del(['public', 'tmp', 'manifest']);
});

gulp.task('assets', function() {
    return gulp.src('frontend/assets/**/*.*', {since: gulp.lastRun('assets')})
        .pipe(gulpIf(!isDevelopment, revReplace({
            manifest: gulp.src('manifest/css.json', {allowEmpty: true})
        })))
        .pipe(gulpIf(!isDevelopment, revReplace({
            manifest: gulp.src('manifest/webpack.json', {allowEmpty: true})
        })))
        .pipe(gulp.dest('public'));
});

gulp.task('styles:assets', function() {
    return gulp.src('frontend/styles/**/*.{svg,png}', {since: gulp.lastRun('styles:assets')})
        .pipe(gulpIf(!isDevelopment, rev()))
        .pipe(gulp.dest('public/styles'))
        .pipe(gulpIf(!isDevelopment, combiner(rev.manifest('assets.json'), gulp.dest('manifest'))));
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles:assets', 'styles', 'webpack'), 'assets'));

gulp.task('watch', function() {
    gulp.watch('frontend/styles/**/*.styl', gulp.series('styles'));
    gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
    gulp.watch('frontend/styles/**/*.{svg,png}', gulp.series('styles:assets'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: 'public'
    });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
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

gulp.task('webpack', function(callback) {
    let firstBuildReady = false;
    function done(err, stats) {
        firstBuildReady = true;
        if (err) { // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
            return;  // emit('error', err) in webpack-stream
        }
        gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
            colors: true
        }));
    }
    let options = {
        output: {
            publicPath: '/js/',
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
        options.plugins.push(new AssetsPlugin({
            filename: 'webpack.json',
            path:     __dirname + '/manifest',
            processOutput(assets) {
                for (let key in assets) {
                    assets[key + '.js'] = assets[key].js.slice(options.output.publicPath.length);
                    delete assets[key];
                }
                return JSON.stringify(assets);
            }
        }));
    }
    return gulp.src('frontend/js/*.js')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title:   'Webpack',
                message: err.message
            }))
        }))
        .pipe(named())
        .pipe(webpackStream(options, null, done))
        .pipe(gulpIf(!isDevelopment, uglify()))
        .pipe(gulp.dest('public/js'))
        .on('data', function() {
            if (firstBuildReady) {
                callback();
            }
        });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJHdWxwIGNvbmZpZy9ndWxwZmlsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBkZWwgPSByZXF1aXJlKCdkZWwnKTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnZ3VscC1kZWJ1ZycpO1xuY29uc3QgZ3VscCA9IHJlcXVpcmUoJ2d1bHAnKTtcbmNvbnN0IHNvdXJjZW1hcHMgPSByZXF1aXJlKCdndWxwLXNvdXJjZW1hcHMnKTtcbmNvbnN0IHN0eWx1cyA9IHJlcXVpcmUoJ2d1bHAtc3R5bHVzJyk7XG5jb25zdCBicm93c2VyU3luYyA9IHJlcXVpcmUoJ2Jyb3dzZXItc3luYycpLmNyZWF0ZSgpO1xuY29uc3QgcmVzb2x2ZXIgPSByZXF1aXJlKCdzdHlsdXMnKS5yZXNvbHZlcjtcbmNvbnN0IHN2Z1Nwcml0ZSA9IHJlcXVpcmUoJ2d1bHAtc3ZnLXNwcml0ZScpO1xuY29uc3QgZ3VscElmID0gcmVxdWlyZSgnZ3VscC1pZicpO1xuY29uc3QgY3NzbmFubyA9IHJlcXVpcmUoJ2d1bHAtY3NzbmFubycpO1xuY29uc3QgcmV2ID0gcmVxdWlyZSgnZ3VscC1yZXYnKTtcbmNvbnN0IHJldlJlcGxhY2UgPSByZXF1aXJlKCdndWxwLXJldi1yZXBsYWNlJyk7XG5jb25zdCBub3RpZnkgPSByZXF1aXJlKCdndWxwLW5vdGlmeScpO1xuY29uc3QgY29tYmluZXIgPSByZXF1aXJlKCdzdHJlYW0tY29tYmluZXIyJykub2JqO1xuY29uc3QgdGhyb3VnaDIgPSByZXF1aXJlKCd0aHJvdWdoMicpLm9iajtcbmNvbnN0IGVzbGludCA9IHJlcXVpcmUoJ2d1bHAtZXNsaW50Jyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBwbHVtYmVyID0gcmVxdWlyZSgnZ3VscC1wbHVtYmVyJyk7XG5jb25zdCB3ZWJwYWNrU3RyZWFtID0gcmVxdWlyZSgnd2VicGFjay1zdHJlYW0nKTsgLy8gR3VscCArIFdlYnBhY2sgPSDimaFcbmNvbnN0IHdlYnBhY2sgPSB3ZWJwYWNrU3RyZWFtLndlYnBhY2s7XG5jb25zdCBuYW1lZCA9IHJlcXVpcmUoJ3ZpbnlsLW5hbWVkJyk7XG5jb25zdCBndWxwbG9nID0gcmVxdWlyZSgnZ3VscGxvZycpO1xuY29uc3QgdWdsaWZ5ID0gcmVxdWlyZSgnZ3VscC11Z2xpZnknKTtcbmNvbnN0IEFzc2V0c1BsdWdpbiA9IHJlcXVpcmUoJ2Fzc2V0cy13ZWJwYWNrLXBsdWdpbicpO1xuXG5jb25zdCBpc0RldmVsb3BtZW50ID0gIXByb2Nlc3MuZW52Lk5PREVfRU5WIHx8IHByb2Nlc3MuZW52Lk5PREVfRU5WID09ICdkZXZlbG9wbWVudCc7XG5cbmd1bHAudGFzaygnc3R5bGVzJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGd1bHAuc3JjKCdmcm9udGVuZC9zdHlsZXMvaW5kZXguc3R5bCcpXG4gICAgICAgIC5waXBlKHBsdW1iZXIoe1xuICAgICAgICAgICAgZXJyb3JIYW5kbGVyOiBub3RpZnkub25FcnJvcihlcnIgPT4gKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogICAnU3R5bGVzJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZVxuICAgICAgICAgICAgfSkpXG4gICAgICAgIH0pKVxuICAgICAgICAucGlwZShndWxwSWYoaXNEZXZlbG9wbWVudCwgc291cmNlbWFwcy5pbml0KCkpKVxuICAgICAgICAucGlwZShzdHlsdXMoe1xuICAgICAgICAgICAgZGVmaW5lOiB7XG4gICAgICAgICAgICAgICAgdXJsOiByZXNvbHZlcigpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKVxuICAgICAgICAucGlwZShndWxwSWYoaXNEZXZlbG9wbWVudCwgc291cmNlbWFwcy53cml0ZSgpKSlcbiAgICAgICAgLnBpcGUoZ3VscElmKCFpc0RldmVsb3BtZW50LCBjb21iaW5lcihjc3NuYW5vKCksIHJldigpKSkpXG4gICAgICAgIC5waXBlKGd1bHAuZGVzdCgncHVibGljL3N0eWxlcycpKVxuICAgICAgICAucGlwZShndWxwSWYoIWlzRGV2ZWxvcG1lbnQsIGNvbWJpbmVyKHJldi5tYW5pZmVzdCgnY3NzLmpzb24nKSwgZ3VscC5kZXN0KCdtYW5pZmVzdCcpKSkpO1xuXG59KTtcblxuZ3VscC50YXNrKCdzdHlsZXM6c3ZnJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGd1bHAuc3JjKCdmcm9udGVuZC9zdHlsZXMvKiovKi5zdmcnKVxuICAgICAgICAucGlwZShzdmdTcHJpdGUoe1xuICAgICAgICAgICAgbW9kZToge1xuICAgICAgICAgICAgICAgIGNzczoge1xuICAgICAgICAgICAgICAgICAgICBkZXN0OiAgICAgICAnLicsIC8vIHdoZXJlIHRvIHB1dCBzdHlsZSAmJiBzcHJpdGUsIGRlZmF1bHQ6ICdjc3MnXG4gICAgICAgICAgICAgICAgICAgIGJ1c3Q6ICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzcHJpdGU6ICAgICAnc3ByaXRlLnN2ZycsIC8vIGZpbGVuYW1lIGZvciBzcHJpdGUgcmVsYXRpdmUgdG8gZGVzdFxuICAgICAgICAgICAgICAgICAgICBsYXlvdXQ6ICAgICAndmVydGljYWwnLFxuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6ICAgICAnJCcsIC8vIC5zdmctXG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcjogICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0OiAnc3ByaXRlLnN0eWwnICAvLyBmaWxlbmFtZSBmb3IgLnN0eWwgcmVsYXRpdmUgdG8gZGVzdF5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgICAgIC5waXBlKGRlYnVnKHt0aXRsZTogJ3N0eWxlczpzdmcnfSkpXG4gICAgICAgIC5waXBlKGd1bHBJZignKi5zdHlsJywgZ3VscC5kZXN0KCd0bXAvc3R5bGVzJyksIGd1bHAuZGVzdCgncHVibGljL3N0eWxlcycpKSk7XG59KTtcblxuZ3VscC50YXNrKCdjbGVhbicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWwoWydwdWJsaWMnLCAndG1wJywgJ21hbmlmZXN0J10pO1xufSk7XG5cbmd1bHAudGFzaygnYXNzZXRzJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGd1bHAuc3JjKCdmcm9udGVuZC9hc3NldHMvKiovKi4qJywge3NpbmNlOiBndWxwLmxhc3RSdW4oJ2Fzc2V0cycpfSlcbiAgICAgICAgLnBpcGUoZ3VscElmKCFpc0RldmVsb3BtZW50LCByZXZSZXBsYWNlKHtcbiAgICAgICAgICAgIG1hbmlmZXN0OiBndWxwLnNyYygnbWFuaWZlc3QvY3NzLmpzb24nLCB7YWxsb3dFbXB0eTogdHJ1ZX0pXG4gICAgICAgIH0pKSlcbiAgICAgICAgLnBpcGUoZ3VscElmKCFpc0RldmVsb3BtZW50LCByZXZSZXBsYWNlKHtcbiAgICAgICAgICAgIG1hbmlmZXN0OiBndWxwLnNyYygnbWFuaWZlc3Qvd2VicGFjay5qc29uJywge2FsbG93RW1wdHk6IHRydWV9KVxuICAgICAgICB9KSkpXG4gICAgICAgIC5waXBlKGd1bHAuZGVzdCgncHVibGljJykpO1xufSk7XG5cbmd1bHAudGFzaygnc3R5bGVzOmFzc2V0cycsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBndWxwLnNyYygnZnJvbnRlbmQvc3R5bGVzLyoqLyoue3N2Zyxwbmd9Jywge3NpbmNlOiBndWxwLmxhc3RSdW4oJ3N0eWxlczphc3NldHMnKX0pXG4gICAgICAgIC5waXBlKGd1bHBJZighaXNEZXZlbG9wbWVudCwgcmV2KCkpKVxuICAgICAgICAucGlwZShndWxwLmRlc3QoJ3B1YmxpYy9zdHlsZXMnKSlcbiAgICAgICAgLnBpcGUoZ3VscElmKCFpc0RldmVsb3BtZW50LCBjb21iaW5lcihyZXYubWFuaWZlc3QoJ2Fzc2V0cy5qc29uJyksIGd1bHAuZGVzdCgnbWFuaWZlc3QnKSkpKTtcbn0pO1xuXG5ndWxwLnRhc2soJ2J1aWxkJywgZ3VscC5zZXJpZXMoJ2NsZWFuJywgZ3VscC5wYXJhbGxlbCgnc3R5bGVzOmFzc2V0cycsICdzdHlsZXMnLCAnd2VicGFjaycpLCAnYXNzZXRzJykpO1xuXG5ndWxwLnRhc2soJ3dhdGNoJywgZnVuY3Rpb24oKSB7XG4gICAgZ3VscC53YXRjaCgnZnJvbnRlbmQvc3R5bGVzLyoqLyouc3R5bCcsIGd1bHAuc2VyaWVzKCdzdHlsZXMnKSk7XG4gICAgZ3VscC53YXRjaCgnZnJvbnRlbmQvYXNzZXRzLyoqLyouKicsIGd1bHAuc2VyaWVzKCdhc3NldHMnKSk7XG4gICAgZ3VscC53YXRjaCgnZnJvbnRlbmQvc3R5bGVzLyoqLyoue3N2Zyxwbmd9JywgZ3VscC5zZXJpZXMoJ3N0eWxlczphc3NldHMnKSk7XG59KTtcblxuZ3VscC50YXNrKCdzZXJ2ZScsIGZ1bmN0aW9uKCkge1xuICAgIGJyb3dzZXJTeW5jLmluaXQoe1xuICAgICAgICBzZXJ2ZXI6ICdwdWJsaWMnXG4gICAgfSk7XG4gICAgYnJvd3NlclN5bmMud2F0Y2goJ3B1YmxpYy8qKi8qLionKS5vbignY2hhbmdlJywgYnJvd3NlclN5bmMucmVsb2FkKTtcbn0pO1xuXG5ndWxwLnRhc2soJ2RldicsIGd1bHAuc2VyaWVzKCdidWlsZCcsIGd1bHAucGFyYWxsZWwoJ3NlcnZlJywgZnVuY3Rpb24oKSB7XG4gICAgZ3VscC53YXRjaCgnZnJvbnRlbmQvc3R5bGVzLyoqLyouc3R5bCcsIGd1bHAuc2VyaWVzKCdzdHlsZXMnKSk7XG4gICAgZ3VscC53YXRjaCgnZnJvbnRlbmQvYXNzZXRzLyoqLyouKicsIGd1bHAuc2VyaWVzKCdhc3NldHMnKSk7XG4gICAgZ3VscC53YXRjaCgnZnJvbnRlbmQvc3R5bGVzLyoqLyoue3N2Zyxwbmd9JywgZ3VscC5zZXJpZXMoJ3N0eWxlczphc3NldHMnKSk7XG59KSkpO1xuXG5ndWxwLnRhc2soJ2xpbnQnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgZXNsaW50UmVzdWx0cyA9IHt9O1xuICAgIGxldCBjYWNoZUZpbGVQYXRoID0gcHJvY2Vzcy5jd2QoKSArICcvdG1wL2xpbnRDYWNoZS5qc29uJztcbiAgICB0cnkge1xuICAgICAgICBlc2xpbnRSZXN1bHRzID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoY2FjaGVGaWxlUGF0aCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICB9XG4gICAgcmV0dXJuIGd1bHAuc3JjKCdmcm9udGVuZC8qKi8qLmpzJywge3JlYWQ6IGZhbHNlfSlcbiAgICAgICAgLnBpcGUoZ3VscElmKFxuICAgICAgICAgICAgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlc2xpbnRSZXN1bHRzW2ZpbGUucGF0aF0gJiYgZXNsaW50UmVzdWx0c1tmaWxlLnBhdGhdLm10aW1lID09IGZpbGUuc3RhdC5tdGltZS50b0pTT04oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aHJvdWdoMihmdW5jdGlvbihmaWxlLCBlbmMsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgZmlsZS5lc2xpbnQgPSBlc2xpbnRSZXN1bHRzW2ZpbGUucGF0aF0uZXNsaW50O1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGZpbGUpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjb21iaW5lcihcbiAgICAgICAgICAgICAgICB0aHJvdWdoMihmdW5jdGlvbihmaWxlLCBlbmMsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGUuY29udGVudHMgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZS5wYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgZmlsZSk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZXNsaW50KCksXG4gICAgICAgICAgICAgICAgdGhyb3VnaDIoZnVuY3Rpb24oZmlsZSwgZW5jLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBlc2xpbnRSZXN1bHRzW2ZpbGUucGF0aF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlc2xpbnQ6IGZpbGUuZXNsaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgbXRpbWU6IGZpbGUuc3RhdC5tdGltZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBmaWxlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICApKVxuICAgICAgICAub24oJ2VuZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZnMud3JpdGVGaWxlU3luYyhjYWNoZUZpbGVQYXRoLCBKU09OLnN0cmluZ2lmeSgoZXNsaW50UmVzdWx0cykpKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnBpcGUoZXNsaW50LmZhaWxBZnRlckVycm9yKCkpO1xufSk7XG5cbmd1bHAudGFzaygnd2VicGFjaycsIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgbGV0IGZpcnN0QnVpbGRSZWFkeSA9IGZhbHNlO1xuICAgIGZ1bmN0aW9uIGRvbmUoZXJyLCBzdGF0cykge1xuICAgICAgICBmaXJzdEJ1aWxkUmVhZHkgPSB0cnVlO1xuICAgICAgICBpZiAoZXJyKSB7IC8vIGhhcmQgZXJyb3IsIHNlZSBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3Mvbm9kZS5qcy1hcGkuaHRtbCNlcnJvci1oYW5kbGluZ1xuICAgICAgICAgICAgcmV0dXJuOyAgLy8gZW1pdCgnZXJyb3InLCBlcnIpIGluIHdlYnBhY2stc3RyZWFtXG4gICAgICAgIH1cbiAgICAgICAgZ3VscGxvZ1tzdGF0cy5oYXNFcnJvcnMoKSA/ICdlcnJvcicgOiAnaW5mbyddKHN0YXRzLnRvU3RyaW5nKHtcbiAgICAgICAgICAgIGNvbG9yczogdHJ1ZVxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgIHB1YmxpY1BhdGg6ICcvanMvJyxcbiAgICAgICAgICAgIGZpbGVuYW1lOiBpc0RldmVsb3BtZW50ID8gJ1tuYW1lXS5qcycgOiAnW25hbWVdLVtjaHVua2hhc2g6MTBdLmpzJ1xuICAgICAgICB9LFxuICAgICAgICB3YXRjaDogICBpc0RldmVsb3BtZW50LFxuICAgICAgICBkZXZ0b29sOiBpc0RldmVsb3BtZW50ID8gJ2NoZWFwLW1vZHVsZS1pbmxpbmUtc291cmNlLW1hcCcgOiBudWxsLFxuICAgICAgICBtb2R1bGU6ICB7XG4gICAgICAgICAgICBsb2FkZXJzOiBbe1xuICAgICAgICAgICAgICAgIHRlc3Q6ICAgIC9cXC5qcyQvLFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiZnJvbnRlbmRcIiksXG4gICAgICAgICAgICAgICAgbG9hZGVyOiAgJ2JhYmVsP3ByZXNldHNbXT1lczIwMTUnXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICBuZXcgd2VicGFjay5Ob0Vycm9yc1BsdWdpbigpXG4gICAgICAgIF1cbiAgICB9O1xuICAgIGlmICghaXNEZXZlbG9wbWVudCkge1xuICAgICAgICBvcHRpb25zLnBsdWdpbnMucHVzaChuZXcgQXNzZXRzUGx1Z2luKHtcbiAgICAgICAgICAgIGZpbGVuYW1lOiAnd2VicGFjay5qc29uJyxcbiAgICAgICAgICAgIHBhdGg6ICAgICBfX2Rpcm5hbWUgKyAnL21hbmlmZXN0JyxcbiAgICAgICAgICAgIHByb2Nlc3NPdXRwdXQoYXNzZXRzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGFzc2V0cykge1xuICAgICAgICAgICAgICAgICAgICBhc3NldHNba2V5ICsgJy5qcyddID0gYXNzZXRzW2tleV0uanMuc2xpY2Uob3B0aW9ucy5vdXRwdXQucHVibGljUGF0aC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXNzZXRzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhc3NldHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiBndWxwLnNyYygnZnJvbnRlbmQvanMvKi5qcycpXG4gICAgICAgIC5waXBlKHBsdW1iZXIoe1xuICAgICAgICAgICAgZXJyb3JIYW5kbGVyOiBub3RpZnkub25FcnJvcihlcnIgPT4gKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogICAnV2VicGFjaycsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2VcbiAgICAgICAgICAgIH0pKVxuICAgICAgICB9KSlcbiAgICAgICAgLnBpcGUobmFtZWQoKSlcbiAgICAgICAgLnBpcGUod2VicGFja1N0cmVhbShvcHRpb25zLCBudWxsLCBkb25lKSlcbiAgICAgICAgLnBpcGUoZ3VscElmKCFpc0RldmVsb3BtZW50LCB1Z2xpZnkoKSkpXG4gICAgICAgIC5waXBlKGd1bHAuZGVzdCgncHVibGljL2pzJykpXG4gICAgICAgIC5vbignZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGZpcnN0QnVpbGRSZWFkeSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xufSk7Il0sImZpbGUiOiJHdWxwIGNvbmZpZy9ndWxwZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
