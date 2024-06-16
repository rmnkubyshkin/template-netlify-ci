const gulp = require('gulp');
const concat = require('gulp-concat-css');
const del = require('del');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const build = gulp.series(clean, gulp.parallel(html, css, images, fonts, videos));
const watchapp = gulp.parallel(build, watchFiles, serve);
const postcss = qulp.require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mediaquery = require('postcss-combine-media-query');

 
exports.clean = clean;
exports.fonts = fonts; 
exports.videos = videos; 
exports.images = images; 
exports.css = css; 
exports.html = html;
exports.build = build;
exports.watchapp = watchapp;
exports.default = watchapp;

function html() {
  return gulp.src('src/**/*.html')
          .pipe(plumber())
            .pipe(gulp.dest('dist/'))
              .pipe(browserSync.reload({stream: true}));
}


function css() {
  plugins = [
    autoprefixer(),
    mediaquery()
  ];
  return gulp.src('src/blocks/**/*.css')
          .pipe(plumber())
            .pipe(concat('bundle.css'))
              .pipe(gulp.postcss(plugins))
                .pipe(gulp.dest('dist/'))
                  .pipe(browserSync.reload({stream: true}));
}


function images() {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
            .pipe(gulp.dest('dist/images'))
              .pipe(browserSync.reload({stream: true}));
}


function videos() {
  return gulp.src('src/videos/**/*.{mp4,avi,mov,wmv,webm,mkv}')
          .pipe(gulp.dest('dist/videos'))
            .pipe(browserSync.reload({stream: true}));
}


function fonts() {
  return gulp.src('src/fonts/**/*.{woff,woff2,ttf,otf,eot}')
          .pipe(gulp.dest('dist/fonts'))
            .pipe(browserSync.reload({stream: true}));
}


function clean() {
  return del('dist');
}


function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/blocks/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
  gulp.watch(['src/videos/**/*.{mp4,avi,mov,wmv,webm,mkv}'], videos);
  gulp.watch(['src/fonts/**/*.{woff,woff2,ttf,otf,eot}'], fonts);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
} 