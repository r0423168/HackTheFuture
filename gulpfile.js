const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const gulpNodemon = (nodemon = require('gulp-nodemon'));

function startNodemon(done) {
    gulpNodemon({
        script: 'app.js',
        ext: 'js html',
        env: { NODE_ENV: 'development' },
        done: done,
    });
}
/*
 * Add compressor from sass to css files
 * Sass is not browser supported.
 */

// function sass2css(done) {
//     src('./wp-content/themes/bookPress/assets/src/sass/style.scss')
//         .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
//         .pipe(rename('style.min.css'))
//         .pipe(dest('./wp-content/themes/bookPress/assets/dist/css/'))
//         .pipe(browserSync.stream());
//     done();
// }

/*
 * Compress all jpeg, png and svg files.
 */

// function compressImages(done) {
//     src('./wp-content/themes/bookPress/assets/src/images/*')
//         .pipe(imagemin({ progressive: true }))
//         .pipe(dest('./wp-content/themes/bookPress/assets/dist/images/'))
//         .pipe(browserSync.stream());
//     done();
// }

/**
 * Minify all js files.
 */

function minifyJs(done) {
    src('./public/src/javascript/*.js')
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./public/javascript/'))
        .pipe(browserSync.stream());
    done();
}

/**
 * Refresh browser after changes.
 */

// function reBrowserSync(done) {
//     src('./*').pipe(browserSync.stream());
//     done();
// }

// /**
//  * Open browser with project.
//  */

// function doBrowserSync() {
//     browserSync.init({
//         open: 'external',
//         host: 'localhost.test',
//         proxy: 'localhost.test',
//     });
// }

// watch('./wp-content/themes/bookPress/assets/src/sass/**/*.scss', sass2css);
// watch('./wp-content/themes/bookPress/assets/src/images/*', compressImages);
watch('./public/src/javascript/*', minifyJs);
// watch('./wp-content/themes/bookPress/*.php', reBrowserSync);
// watch('./wp-content/themes/bookPress/*.html', reBrowserSync);
// watch('./wp-content/themes/bookPress/templates/*.php', reBrowserSync);
// watch('./wp-content/themes/bookPress/templates/*.html', reBrowserSync);
// watch('./wp-content/themes/bookPress/components/*.php', reBrowserSync);
// watch('./wp-content/themes/bookPress/components/*.html', reBrowserSync);

module.exports.default = parallel(
    startNodemon,
    rename,
    // sass2css,
    // compressImages,
    minifyJs
    // doBrowserSync
);
