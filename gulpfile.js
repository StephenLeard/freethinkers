var gulp = require('gulp'),
		gutil = require('gulp-util'),
		browserify = require('gulp-browserify'),
		compass = require('gulp-compass'),
		connect = require('gulp-connect'),
		gulpif = require('gulp-if'),
		uglify = require('gulp-uglify'),
		minifyHTML = require('gulp-minify-html'),
		concat = require('gul-concat'),
		path = require('path');

var env, jsSources, sassSources, htmlSources, outputDir, sassStyle;

env = 'development';

if (env === 'development') {
	outputDir = 'pressd/devo';
	sassStyle = 'expanded';
} else {
	outputDir = 'pressd/pro';
	sassStyle = 'compressed';
}