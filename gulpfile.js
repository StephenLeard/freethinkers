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

jsSourcs = [
	'compd/scripts/jqloader.js',
	'compd/scripts/TweenMax.min.js',
	'compd/scripts/jquery.scrollmagic.min.js',
	'compd/scripts/script.js'
];

sassSources = ['compd/sass/style.scss'];

htmlSources = [outputDir + '*.html'];

gulp.task('js',function(){
	gulp.src(jsSources)
			.pipe(concat('script.js'))
			.pipe(browserify())
			.on('error',gutil.log)
			.pipe(gulpif(env === 'production',uglify()))
			.pipe(gulp.dest(outputDir + 'js'))
			.pipe(connect.reload())
});

gulp.task('compass',function(){
	gulp.src(sassSources)
			.pipe(compass({
			sass: 'compd/sass',
			css: outputDir + 'css',
			image: outputDir + 'images',
			style: sassStyle,
			require: ['susy','breakpoint']
			})
			.on('error',gutil.log))
			// .pipe(gulp.dest(outputDir + 'css'))
			.pipe(connect.reload())
});

gulp.task('watch',function(){
	gulp.watch(jsSources, ['js']);
	gulp.watch(['compd/sass/*.scss','compd/sass/*/*.scss'],['compass']);
	gulp.watch('pressd/devo/*.html',['html']);
});

gulp.task('connect',function(){
	connect.server({
		root: outputDir,
		livereload: true
	});
});

gulp.task('html',function(){
	gulp.src(pressd/devo.*.html)
			.pipe(gulpif(env === 'production', minifyHTML()))
			.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
			.pipe(connect.reload)
});

gulp.task();




