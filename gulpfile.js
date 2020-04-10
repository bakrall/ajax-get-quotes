const gulp = require('gulp'),
	connect = require('gulp-connect');

const runServer = () => connect.server();

exports.default = runServer;
