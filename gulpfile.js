const path = require('path')
const gulp = require('gulp')
const clean = require('gulp-clean')
const stylus = require('gulp-stylus')
const rename = require('gulp-rename')

const pathResolve = src => path.resolve(__dirname, src)
const filesPath = pathResolve('src/**/*')
const stylsPath = pathResolve('src/**/*.styl')
const distPath = pathResolve('dist')

gulp.task('clean-dist', () => {
    return gulp.src(distPath, {
        allowEmpty: true
    }).pipe(clean())
})

gulp.task('copy-src', async () => {
    gulp.src(filesPath, {
        ignore: stylsPath
    }).pipe(gulp.dest(distPath))
})

gulp.task('compile-styl', async () => {
    gulp.src(stylsPath)
        .pipe(stylus())
        .pipe(rename(path => {
            path.extname = '.wxss'
        }))
        .pipe(gulp.dest(distPath))
})

gulp.task('default', gulp.series('clean-dist', gulp.parallel('copy-src', 'compile-styl')))

gulp.watch([filesPath], gulp.series('default'))
