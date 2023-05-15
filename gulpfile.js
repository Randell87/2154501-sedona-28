import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import svgSprite from 'gulp-svg-sprite';

// Styles

export const styles = () => {
  return gulp.src('source/less/main.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
    .pipe(browser.stream());
}

// Script

const sctipt = () => {
  return gulp.src('source/js/*js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

// Copy

const copy = () => {
  return gulp.src([
    'source/fonts/*.*',
    'source/img/favicon/*.png',
    'source/manifest.webmanifest',
    'source/favicon.ico'
  ], { base: 'source' })
    .pipe(gulp.dest('build'))
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
  gulp.watch('source/js/*.js', gulp.series(scripts));
}


export default gulp.series(
  styles, server, watcher
);

// SVG

export const sprite = () => {
  return gulp.src('source/img/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../stack.svg'
        }
      }
    }))
    .pipe(gulp.dest('source/img/'))
}
