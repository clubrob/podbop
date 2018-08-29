require('dotenv').config();
// const path = require('path');
const gulp = require('gulp');
const del = require('del');
// HTML processing modules
// CSS processing modules
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const precss = require('precss');
const colorFunction = require('postcss-color-function');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
// JS processing modules
const terser = require('gulp-uglify-es').default;
const webpackStream = require('webpack-stream');
// Dev browser modules
const browser = require('browser-sync').create();
const historyApi = require('connect-history-api-fallback');

gulp.task('clean:public', () => {
  return del(['public/**/*']);
});

gulp.task('bundleJSDev', () =>
  gulp
    .src('src/js/app.js', { sourcemaps: true })
    .pipe(
      webpackStream({
        mode: 'development',
        output: {
          filename: 'app.bundle.js',
        },
        devtool: 'inline-source-map',
        node: {
          fs: 'empty',
        },
        plugins: [
          new webpackStream.webpack.EnvironmentPlugin([
            'FIREBASE_API_KEY',
            'FIREBASE_DATABASE_URL',
            'FIREBASE_PROJECT_ID',
            'FIREBASE_STORAGE_BUCKET',
            'FIREBASE_AUTH_DOMAIN',
          ]),
        ],
      })
    )
    .pipe(gulp.dest('public/js/'))
    .pipe(browser.stream())
);

gulp.task('bundleJS', () =>
  gulp
    .src('src/js/app.js')
    .pipe(
      webpackStream({
        mode: 'production',
        output: {
          filename: 'app.bundle.js',
        },
        node: {
          fs: 'empty',
        },
        plugins: [
          new webpackStream.webpack.EnvironmentPlugin([
            'FIREBASE_API_KEY',
            'FIREBASE_DATABASE_URL',
            'FIREBASE_PROJECT_ID',
            'FIREBASE_STORAGE_BUCKET',
          ]),
        ],
      })
    )
    .pipe(terser())
    .pipe(gulp.dest('public/js/'))
    .pipe(browser.stream())
);

gulp.task('bundleCSS', () =>
  gulp
    .src('src/css/style.css')
    .pipe(postcss([postcssImport(), precss(), colorFunction(), autoprefixer()]))
    .pipe(csso())
    .pipe(gulp.dest('public/css/'))
    .pipe(browser.stream())
);

gulp.task('cleanHTML', () =>
  gulp
    .src('src/*.html')
    .pipe(gulp.dest('public/'))
    .pipe(browser.stream())
);

gulp.task(
  'serve',
  gulp.parallel(
    ['bundleCSS', 'bundleJSDev', 'cleanHTML'],
    function browserSyncInit() {
      browser.init({
        port: 5500,
        server: {
          baseDir: './public',
          middleware: [historyApi()],
        },
      });

      gulp.watch('src/css/**/*.css', gulp.series('bundleCSS'));
      gulp.watch('src/css/**/*.pcss', gulp.series('bundleCSS'));
      gulp.watch('src/js/**/*.js', gulp.series('bundleJSDev'));
      gulp.watch('src/*.html', gulp.series('cleanHTML'));
    }
  )
);

gulp.task('default', gulp.series('clean:public', 'serve'));
gulp.task('build', gulp.parallel('bundleCSS', 'bundleJS', 'cleanHTML'));
gulp.task('prod', gulp.series('clean:public', 'build'));
