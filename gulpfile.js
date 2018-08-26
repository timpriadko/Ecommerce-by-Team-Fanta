var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps  = require('gulp-sourcemaps');
var notify      = require('gulp-notify');
var plumber     = require('gulp-plumber');
var del         = require('del');

var onError = function(error){
    return error.messageOriginal ?
        "File: " + error.file +
        "\rAt: " + error.line + error.column +
        "\r" + error.messageOriginal :
        error;
};

gulp.task('sass', function () {
    return gulp.src('app/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler : notify.onError({
                title: 'SCSS error',
                message: onError
            })
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(sourcemaps.write('.'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('app/css'))
        .pipe(notify({message: 'SCSS created', onLast: true})) // Отправляет сообщение об удачной компиляции
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function(){
    gulp.watch('app/scss/**/*.scss', ['sass']); // Наблюдение за sass файлами и применение таска при их изменении
    gulp.watch('app/*.html',browserSync.reload); // Наблюдение за html файлами и перезарузка страницы при их изменении
    gulp.watch('app/js/**/*.js',browserSync.reload); // Наблюдение за js файлами и перезарузка страницы при их изменении
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['clean', 'sass'], function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/css/style.css'
    ])
        .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']);