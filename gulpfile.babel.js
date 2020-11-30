import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import browserSync from "browser-sync";

exports.sass = () => (
    gulp.src('./src/scss/**/**')
    .pipe(sass({outputStyle: 'compressed', errLogToConsole: true }))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./dist/css'))
);

exports.scripts = () => (
	gulp.src(['./src/js/*/**', './src/js/main.js'])
    .pipe(concat('scripts.min.js'))
	.pipe(babel())
    .pipe(gulp.dest('./dist/js'))
);

gulp.task('watch', () => {
    gulp.watch('./src/scss/**/**', gulp.series('sass'))
    gulp.watch('./src/js/**/**', gulp.series('scripts'))
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html'
        }
    });

    gulp.watch('./src/scss/**/**', gulp.series('sass'))
    gulp.watch('./src/js/**/**', gulp.series('scripts'))
    gulp.watch('./**/**/**/**').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('watch'));