const gulp = require("gulp");
const less = require("gulp-less");
const cleanCSS = require("gulp-clean-css");
const del = require("del");

const paths = {
  src: "src/*.less",
  dest: "dist",
};

function styles() {
  return gulp
    .src(paths.src)
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.dest));
}
function clean() {
  return del([paths.dest]);
}

exports.default = gulp.series(clean, styles);
