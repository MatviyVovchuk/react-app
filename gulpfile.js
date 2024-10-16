import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import concat from "gulp-concat";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";

const sass = gulpSass(dartSass);

const scssPath = "./src/styles/scss/**/*.scss";
const cssDest = "./src/styles/css/";

function compileSCSS() {
  return gulp
    .src(scssPath)
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("styles.css"))
    .pipe(gulp.dest(cssDest))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(cssDest));
}

function watchSCSS() {
  gulp.watch(scssPath, compileSCSS);
}

export { compileSCSS, watchSCSS };
export default gulp.series(compileSCSS, watchSCSS);
