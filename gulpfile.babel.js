import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import stripDebug from 'gulp-strip-debug';

exports.sass = () => (
    gulp.src('./src/scss/**/**')
    .pipe(sass({outputStyle: 'compressed', errLogToConsole: true }))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./dist/css'))
);

exports.scripts = () => (
	gulp.src('./src/js/**/**')
	.pipe(stripDebug())
    .pipe(concat('scripts.min.js'))
	.pipe(babel())
    .pipe(gulp.dest('./dist/js'))
);

gulp.task('watch', () => {
    gulp.watch('./src/scss/**/**', gulp.series('sass'))
    gulp.watch('./src/js/**/**', gulp.series('scripts'))
});

gulp.task('default', gulp.series('watch'));