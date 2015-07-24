/*
 * grunt-hexo
 * https://github.com/4nduril/grunt-hexo
 *
 * Copyright (c) 2015 Tobias Barth
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('hexo', 'A Grunt wrapper for the Hexo static site blog framework', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      root: '/'
    });
	
	var hexo = require('./lib/hexo');

	var done = this.async();

	hexo(options.root, 'generate', done, {}, true);

  });
	

};
