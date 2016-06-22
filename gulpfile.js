"use strict";

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");

gulp.task("serve", ["sass"], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("./scss/*.scss", ["sass"]);
    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch("./js/**/*.js", ["js-watch"]);
});

gulp.task("sass", function() {
    return gulp.src("./scss/*.scss")
        .pipe(autoprefixer())
        .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task("js-watch", ["js"], browserSync.reload);

gulp.task("js", function() {
    return gulp.src("./js/**/*.js")
        .pipe(uglify().on("error", function(e){
            console.log(e);
        }))
        .pipe(gulp.dest("./dist"))
        .pipe(browserSync.stream());
});

gulp.task("default", ["serve"]);
