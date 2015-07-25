/*
 * grunt-hexo
 * https://github.com/4nduril/grunt-hexo
 *
 * Copyright (c) 2015 Tobias Barth
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= mochaTest.test.src %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Unit tests.
		mochaTest: {
			test: {
			options: {
				reporter: 'nyan',
			},
			src: ['test/*_test.js']
		}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.registerTask('test', ['mochaTest']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
