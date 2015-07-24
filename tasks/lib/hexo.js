/*
 * grunt-hexo
 * https://github.com/4nduril/grunt-hexo
 *
 * Copyright (c) 2015 Tobias Barth
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(hexoRoot, cliCmd, callback, options, isGrunt, altHexo) {
	
	var path = require('path');
	var fs = require('fs');

	var modulePath = 'node_modules/hexo/lib/hexo/index.js';
	var noFolderErrMsg = 'No Hexo folder given.';
	var hexoNotFoundErrMsg = 'Hexo can not be found. Is it installed? Exiting …';
	var grunt;

	if (isGrunt === undefined) {
		isGrunt = false;
	} else if (isGrunt) {
		grunt = require('grunt');
	}
	
	// Make hexoRoot a valid path
	try {
		hexoRoot = path.join(process.cwd(), hexoRoot);
	} catch(err) {
	// Do a better Error message and if grunt use grunt.log
		if (isGrunt) {
			grunt.log.error(noFolderErrMsg);
			return false;
		} else {
			throw new Error(noFolderErrMsg);
		}
	}

	if (options === undefined) {
		options = {};
	}

	var hexoPath = path.join(
		hexoRoot,
		modulePath
	);

	// Open Hexo constructor for injection (useful for testing ...)
	var Hexo;
	if (altHexo) {
		Hexo = altHexo;
	} else if (fs.existsSync(hexoPath)) {
		Hexo = require(hexoPath);
	} else {
		if (isGrunt) {
			grunt.log.error(hexoNotFoundErrMsg);
			return false;
		} else {
			throw new Error(hexoNotFoundErrMsg);
		}
	}

	// Initialize Hexo …
	var hexo = new Hexo(hexoRoot, {});

	// Call the specified cli command then exit cleanly and call callback
	hexo.init().then(function() {
		hexo.call(cliCmd, options).then(function() {
			callback(hexo.exit());
		}).catch(function(err) {
			callback(hexo.exit(err));
		});
	});
};
