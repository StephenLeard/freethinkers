var gulp = require('gulp'),
	gutil = ('gulp-util'),
	browserify = ('gulp-browserify'),
	compass = ('gulp-compass'),
	connect = ('gulp-connect'),
	gulpif = ('gulp-if'),
	uglify = ('gulp-uglify'),
	minifyHTML = ('gulp-minify-html'),
	concat = ('gulp-concat'),
	path = require('path');

var env,
	jsSources,
	sassSources,
	htmlSources,
	outputDir,
	sassStyle;

env = 'development';

if (env === 'development') {
	outputDir = 'pressd/devo/';
	sassStyle = 'expanded';
} else {
	outputDir = 'pressd/pro/';
	sassStyle = 'compressed';
}

jsSources = [
	// 'comps/scripts/jqloader.js',
	'comps/scripts/TweenMax.min.js',
	'comps/scripts/jquery.scrollmagic.min.js'
	// 'comps/scripts/script.js'
];
sassSources = ['comps/sass/style.scss'];
htmlSources = [outputDir + '*.html'];

gulp.task('js',function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.on('error',gutil.log)
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload())
});

gulp.task('compass',function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'comps/sass',
			css: outputDir + 'css',
			image: outputDir + 'images',
			style: sassStyle,
			require: ['susy','breakpoint']
		})
		.on('error',gutil.log))
		.pipe(connect.reload())
});

gulp.task('watch',function(){
	gulp.watch(jsSources,['js']);
	// gulp.watch(['comps/sass/*.scss','comps/sass/*/*.scss'],['compass']);
	// gulp.watch('pressd/devo/*.html',['html']);
});

gulp.task('connect',function(){
	connect.server({
		root: outputDir,
		livereload: true
	})
});

gulp.task('html',function(){
	gulp.src('pressd/devo/*.html')
		.pipe(gulpif(env === 'production', minifyHTML()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(connect.reload())
});

gulp.task('default',
	['watch',
	 // 'html',
	 // 'js',
	 // 'compass',
	 'connect']);