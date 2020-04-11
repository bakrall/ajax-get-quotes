//https://coder-coder.com/gulp-4-walk-through/ - https://github.com/thecodercoder/frontend-boilerplate/blob/master/gulpfile.js

const { src, dest, watch, series, parallel } = require('gulp');
//CSS packages
const sourcemaps = require('gulp-sourcemaps'); //maps CSS styles back to original SCSS file in browser dev tools
const sass = require('gulp-sass'); //compiles SCSS to CSS
const postcss = require('gulp-postcss'); //runs autoprefixer and cssnano
const autoprefixer = require('autoprefixer'); //adds vendor prefixes to CSS
const cssnano = require('cssnano'); //minifies CSS
//JS packages
const uglify = require('gulp-uglify-es').default;
//string replace package - cache busting on css and js files references in index.html (when file changes, browser will load newest copy of the file)
const replace = require('gulp-replace');

const connect = require('gulp-connect');

const files = {
	scssPath: 'app/scss/*.scss',
	jsPath: 'app/js/*.js'
}

const scssTask = () => {
	return src(files.scssPath)
		.pipe(sourcemaps.init()) //initialize sourcemaps
		.pipe(sass()) //compile scss to css
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(sourcemaps.write('.')) //write sourcemaps file in current directory
		.pipe(dest('dist'));
}

const jsTask = () => {
	return src(files.jsPath)
		.pipe(uglify())
		.pipe(dest('dist'));
}

const cacheBustTask = () => {
	const cbString = new Date().getTime();

	return src(['index.html'])
		.pipe(replace(/cb=\d+/g, 'cb=' + cbString))
		.pipe(dest('.'));
}

const watchTask = () => {
	watch(
		[files.scssPath, files.jsPath],
		series(
			parallel(scssTask, jsTask),
			cacheBustTask
		)
	);
}

const runServer = () => connect.server();

exports.default = parallel(
	runServer,
	series(	
		parallel(scssTask, jsTask),
		cacheBustTask,
		watchTask
	)
)

// exports.serve = runServer;