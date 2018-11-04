var gulp = require("gulp"),
  // Requires the gulp-sass plugin
  sass = require("gulp-sass"),
  // Requires browserSync plugin
  browserSync = require("browser-sync").create(),
  // Requires gulp-concat concatenation plugin
  concat = require("gulp-concat"),
  // Requires run sequnce to make tasks run in a particluar order
  runSequence = require("run-sequence");
// Requires imagemin for image minification
imagemin = require("gulp-imagemin");

//Gulp task to convert scss into css file in app/css
gulp.task("sass", function() {
  return gulp
    .src("app/scss/styles.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulp.dest("app/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

//Copies styles.css from app to docs folder
gulp.task("copy-styles-css", function() {
  gulp
    .src("app/css/styles.css")
    // Perform minification tasks, etc here
    .pipe(gulp.dest("./docs/css"));
});

//Copy html files from app to docs folder
gulp.task("copy-html", function() {
  gulp
    .src("app/*.html")
    // Perform minification tasks, etc here
    .pipe(gulp.dest("./docs"));
});

//Copy font files from app to docs folder
gulp.task("copy-fonts", function() {
  return gulp
    .src("app/fonts/**/*+(woff|woff2|otf|ttf)")
    .pipe(gulp.dest("docs/fonts"));
});

//Optimises images then copies to docs folder
gulp.task("copy-images", function() {
  return gulp
    .src("app/images/**/*.+(png|jpg|gif|svg)")
    .pipe(imagemin())
    .pipe(gulp.dest("docs/images"));
});

gulp.task("copy-js", function() {
  return gulp
    .src("app/js/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("docs/js"));
});

//Task to watch for changes to sass, html and js in the app folder
gulp.task("watch", ["browserSync", "sass"], function() {
  gulp.watch("app/scss/**/*.scss", ["sass"]);

  // Reloads the browser whenever HTML or JS files change
  gulp.watch("app/*.html", browserSync.reload);
  gulp.watch("app/js/**/*.js", browserSync.reload);
});
gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "app"
    }
  });
});

// Compiles sass and watches for changes to CSS, HTML, JS
gulp.task("default", function(callback) {
  runSequence("sass", ["watch"], callback);
});

//Copies Fonts, images, JS, CSS and HTML files into the docs folder
gulp.task("build", function(callback) {
  runSequence(
    "sass",
    ["copy-styles-css"],
    ["copy-js"],
    ["copy-html"],
    ["copy-fonts"],
    ["copy-images"],
    callback
  );
});
