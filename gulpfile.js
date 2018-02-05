var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps')
var tsProject = ts.createProject("tsconfig.json");
var shell = require('gulp-shell');

gulp.task("gulp-build", function(){
    shell('tsc');
    /*
    return tsProject.src().pipe(sourcemaps.init()).pipe(tsProject())
         .js.pipe(sourcemaps.write('.',{includeContent: false, sourceRoot: '../src/'})).pipe(gulp.dest('dist'));
         */
});