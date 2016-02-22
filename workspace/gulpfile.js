var gulp = require('gulp'),
    builder = require('./webpack-builder.js');

gulp.task('watch', function(callback) {
   builder.watch(callback); 
});

gulp.task('build', function(callback) {
    builder.build(callback);
});

gulp.task('default', ['build']);