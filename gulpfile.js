const {parallel, series, src, dest, watch} = require('gulp');
const {existsSync, unlinkSync} = require('fs');
const pump = require('pump');
const livereload = require('gulp-livereload');
const postcss = require('gulp-postcss');
const zip = require('gulp-zip').default;
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const beeper = require('beeper');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const easyimport = require('postcss-easy-import');

const handleError = done => err => {
    if (err) beeper();
    return done(err);
};

function cleanBuilt(done) {
    [
        'assets/built/theme.css',
        'assets/built/theme.css.map',
        'assets/built/source.js',
        'assets/built/source.js.map',
        'assets/built/theme-ui.js',
        'assets/built/theme-ui.js.map'
    ].forEach((file) => {
        if (existsSync(file)) unlinkSync(file);
    });
    done();
}

function serve(done) {
    livereload.listen();
    done();
}

function hbs(done) {
    pump([src(['*.hbs', 'partials/**/*.hbs']), livereload()], handleError(done));
}

function css(done) {
    pump([
        src('assets/css/theme.css', {sourcemaps: true}),
        postcss([easyimport, autoprefixer(), cssnano()]),
        concat('theme.css'),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function fullJs(done) {
    pump([
        src([
            'assets/js/lib/*.js',
            'assets/js/dropdown.js',
            'assets/js/lightbox.js',
            'assets/js/main.js',
            'assets/js/pagination.js',
            'assets/js/stream.js'
        ], {sourcemaps: true}),
        concat('source.js'),
        uglify(),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function zipper(done) {
    const filename = require('./package.json').name + '.zip';
    pump([
        src([
            '**',
            '!node_modules', '!node_modules/**',
            '!dist', '!dist/**',
            '!*.log',
            '!pnpm-lock.yaml',
            '!gulpfile.js'
        ]),
        zip(filename),
        dest('dist/')
    ], handleError(done));
}

const build = series(cleanBuilt, css, fullJs);

exports.build = build;
exports.zip = series(build, zipper);
exports.default = series(
    build,
    serve,
    parallel(
        () => watch('assets/css/**', css),
        () => watch('assets/js/**', fullJs),
        () => watch(['*.hbs', 'partials/**/*.hbs'], hbs)
    )
);
