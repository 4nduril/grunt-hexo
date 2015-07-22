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
		hexo: {
			std: {
				options: {
					root: '/'
				}
			}
		}
	});
	
	grunt.loadTasks('../tasks');
	grunt.registerTask('default', ['hexo']);
};
