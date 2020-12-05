/*
 * Jack Sutherland 2021
 * https://www.jacksutherland.com
 *
 * Website Gulp File
 */

// Gulp Tasks

const { src, dest, parallel, watch } = require('gulp');

// Gulp Plugins

const rename = require('gulp-rename'),
	  sass = require('gulp-sass'),
	  terser = require('gulp-terser'),
      concat = require('gulp-concat');

// CSS Commands

var css = {
	site: function(callback)
	{
	  	return src(['./src/styles/imports.scss'])
			.pipe(sass())
			.pipe(concat('site.css'))
	        .pipe(dest('./web/css/'))
	        .pipe(sass({outputStyle: 'compressed'}))
	        .pipe(rename({ suffix: '.min' }))
	        .pipe(dest('./web/css/'));
	}
};

// JavaScript Commands

var js = {
	site: function(callback)
	{
		return src([
				'./src/scripts/dom.js',
				'./src/scripts/site.js',
				'./src/scripts/forms.js'
			])
			.pipe(concat('site.js'))
			.pipe(dest('./web/js/'))
			.pipe(terser())
			.pipe(rename({ suffix: '.min' }))
			.pipe(dest('./web/js/'));
	},
	locations: function(callback)
	{
		return src('./src/scripts/locations.js')
			.pipe(concat('locations.js'))
			.pipe(dest('./web/js/'))
			.pipe(terser())
			.pipe(rename({ suffix: '.min' }))
			.pipe(dest('./web/js/'));
	},
	amp: function(callback)
	{
		return src('./src/scripts/amp.js')
			.pipe(concat('locations.js'))
			.pipe(dest('./web/js/'))
			.pipe(terser())
			.pipe(rename({ suffix: '.min' }))
			.pipe(dest('./web/js/'));
	}
};

// Execute Default Tasks

exports.default = parallel(css.site, js.site, js.locations, js.amp);

// Execute Watch Tasks

exports.watch = function()
{
	exports.default();

	// watch js files
	watch('./src/styles/*.scss', css.site);
	
	// watch scss files
	watch('./src/scripts/*.js', js.site);
	watch('./src/scripts/locations.js', js.locations);
	watch('./src/scripts/amp.js', js.amp);
}
