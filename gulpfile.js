const postcssScss = require('postcss-scss');
const postcssSorting = require('postcss-sorting');
const autoprefixer = require('autoprefixer');
const perfectionist = require('perfectionist');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});
const csscombOptions = require('./.csscomb.json');

gulp.task('sass:comb', function() {
    return gulp.src([
        '**/*.{scss, sass}',
        '!**/_**-settings.scss',
        '!node_modules/**/*.{scss, sass}',
        '!**/node_modules/**/*.{scss, sass}',
    ])
        .pipe(plugins.postcss([
            autoprefixer({ add: false, browsers: [] }),
            perfectionist({
                cascade: true,
                colorCase: 'lower',
                colorShorthand: true,
                format: 'expanded',
                indentSize: 4,
                trimLeadingZero: true,
                trimTrailingZeros: true,
                maxAtRuleLength: 80,
                maxSelectorLength: 4,
                maxValueLength: 80,
                sourcemap: false,
                syntax: 'scss',
                zeroLengthNoUnit: true
            }),
            postcssSorting(csscombOptions)
        ], { syntax: postcssScss }))
        .pipe(plugins.eol())
        .pipe(plugins.bom())
        .pipe(gulp.dest(''));
});
