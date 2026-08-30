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
        'assets/built/screen.css',
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
        src('assets/css/theme.css'),
        postcss([easyimport, autoprefixer(), cssnano()]),
        concat('theme.css'),
        dest('assets/built/'),
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
            'assets/js/stream.js'
        ]),
        concat('source.js'),
        uglify(),
        dest('assets/built/'),
        livereload()
    ], handleError(done));
}

function zipper(done) {
    const filename = require('./package.json').name + '.zip';
    pump([
        src([
            '*.hbs',
            'partials/**/*.hbs',
            'assets/built/theme.css',
            'assets/built/source.js',
            'assets/fonts/**',
            'assets/icons/**',
            'assets/images/**',
            'locales/en.json',
            'package.json',
            'routes.yaml',
            'README.md',
            'CHANGELOG.md',
            'CONTRIBUTING.md',
            'SECURITY.md',
            'docs/**/*.md',
            'LICENSE',
            'THIRD_PARTY_NOTICES.md'
        ], {base: '.'}),
        zip(filename),
        dest('dist/')
    ], handleError(done));
}

const build = series(cleanBuilt, css, fullJs);

exports.clean = cleanBuilt;
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
