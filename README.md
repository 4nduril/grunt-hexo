# grunt-hexo

[![Build Status](https://travis-ci.org/4nduril/grunt-hexo.svg?branch=master)](https://travis-ci.org/4nduril/grunt-hexo)
[![npm version](https://badge.fury.io/js/grunt-hexo.svg)](https://badge.fury.io/js/grunt-hexo)

> A Grunt wrapper for the [Hexo](https://github.com/hexojs/hexo) static site blog framework

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-hexo --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hexo');
```

## The "hexo" task

### Overview
In your project's Gruntfile, add a section named `hexo` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  hexo: {
    your_target: {
      options: {
		  root: '/'
	  }
    },
  },
});
```

### Options

#### options.root
Type: `String`
Default value: `'/'`

A valid path within your project directory that contains your Hexo site. It may be the project directory itself or any subdirectory. That option tells grunt-hexo where the Hexo installation and module can be found.

## Further Notes

Currently, this is very basic. It only runs the "generate" console from Hexo, which was enough for my use at the moment. I'm planning to add more commands and options until at some point the whole API of Hexo will be covered (hopefully). PRs are welcome.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

