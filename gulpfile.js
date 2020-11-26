//include gulp
let gulp = require("gulp");
let rename = require("gulp-rename");
let sass = require("gulp-sass");
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');

//Scripts
gulp.task('scripts', function()
{
	gulp.src([
		'./src/scripts/dom.js',
		'./src/scripts/site.js',
		'./src/scripts/forms.js'
	])
	.pipe(concat({
		path: 'site.js'
	}))
	.pipe(gulp.dest('./web/js/'))
	//.pipe(uglify()) // Cannot handle JS classes (find alternative)
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('./web/js/'));
});

//SASS Compile
gulp.task('styles', function() {
    gulp.src(['./src/styles/imports.scss'])
		.pipe(sass())
		.pipe(concat('main.css'))
        .pipe(gulp.dest('./web/css/'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./web/css/'));
});

//Locations Scripts
gulp.task('locationscripts', function()
{
	gulp.src([
		'./src/scripts/locations.js'
	])
	.pipe(concat({
		path: 'locations.js'
	}))
	.pipe(gulp.dest('./web/js/'))
	//.pipe(uglify())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('./web/js/'));
});

gulp.task('ampscripts', function()
{
	gulp.src([
		'./src/scripts/amp.js'
	])
	.pipe(concat({
		path: 'amp.js'
	}))
	.pipe(gulp.dest('./web/js/'))
	//.pipe(uglify())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('./web/js/'));
});

// Prototype Scripts & Styles
// TODO: This can be removed for site builds
// TODO: Reference in templates/_layout.twig as well
gulp.task('prototypescripts', function()
{
	gulp.src([
		'./src/scripts/prototype.js'
	])
	.pipe(concat({
		path: 'prototype.js'
	}))
	.pipe(gulp.dest('./web/js/'))
	//.pipe(uglify())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('./web/js/'));
});

gulp.task('prototypestyles', function() {
    gulp.src(['./src/styles/prototype.scss'])
		.pipe(sass())
		.pipe(concat('prototype.css'))
        .pipe(gulp.dest('./web/css/'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./web/css/'));
});


//watch files
gulp.task('watch', function(){
	gulp.start('styles');
	gulp.start('scripts');
	gulp.start('locationscripts');
	gulp.watch('./src/styles/*.scss', ['styles']);
	gulp.watch('./src/scripts/dom.js', ['scripts']);
	gulp.watch('./src/scripts/site.js', ['scripts']);
	gulp.watch('./src/scripts/forms.js', ['scripts']);
	gulp.watch('./src/scripts/locations.js', ['locationscripts']);
	gulp.watch('./src/scripts/amp.js', ['ampscripts']);

	gulp.watch('./src/scripts/prototype.js', ['prototypescripts']);
	gulp.watch('./src/styles/prototype.scss', ['prototypestyles']);
});

//default tasks
gulp.task('default', ['scripts', 'locationscripts', 'styles', 'prototypescripts', 'prototypestyles', 'ampscripts']);
