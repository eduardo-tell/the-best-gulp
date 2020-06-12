import gulp from 'gulp';
import sass from 'gulp-sass';
import browserSync from "browser-sync";
import babel from 'gulp-babel';
import concat from 'gulp-concat';

exports.sass = () => (
    gulp.src('./src/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed', errLogToConsole: true}))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({stream: true}))
);

gulp.task('scripts', async () => {
    return gulp.src('./src/js/*.js', { allowEmpty: true })
    .pipe(babel({
        presets: ['@babel/env'],
        compact: true
    }))
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './dist',
            index: 'index.html'
        },
        notify: false,
        injectChanges: true
    });

    gulp.watch('./src/scss/**/*', gulp.series('sass'));
    gulp.watch('./src/js/**/*', gulp.series('scripts'));
    gulp.watch('./dist/*').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('serve'));