/*
 * grunt-hexo
 * https://github.com/4nduril/grunt-hexo
 *
 * Copyright (c) 2015 Tobias Barth
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('hexo', 'A Grunt wrapper for the Hexo static site blog framework', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      root: '/'
    });

	// Find the Hexo module and load it.
	var hexoRoot = '.' + options.root;
	var hexoPath = hexoRoot + 'node_modules/hexo/lib/hexo/index.js';
	var Hexo;

	if (grunt.file.exists(hexoPath)) {
		Hexo = require(path.join(process.cwd(), hexoPath));
	} else {
		grunt.log.error('Hexo can not be found. Is it installed? Exiting …');
		return false;
	}
	
	// Initialize Hexo …
	var hexo = new Hexo(path.join(process.cwd(), hexoRoot), {});

	// Asynchronous
	var done = this.async();
	hexo.init().then(function() {
		hexo.call('generate', {}).then(function() {
			done(hexo.exit());
		}).catch(function(err) {
			grunt.log.writeln('Fehler');
			done(hexo.exit(err));
		});
	});

    // Iterate over all specified file groups.
/*    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });*/
  });

};
