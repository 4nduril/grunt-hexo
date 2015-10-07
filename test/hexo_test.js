/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

var Promise = require('es6-promise').Promise;
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
chai.use(require('sinon-chai'));

var hexo = require('../tasks/lib/hexo');

describe('Grunt-Hexo', function() {
	var Hexo, init, call, exit;
	var validCmds = ['clean', 'generate'];
	beforeEach(function() {
		init = sinon.spy();
		call = sinon.spy(function(cliCmd, options) {
			return new Promise(function(resolve, reject) {
				if (validCmds.indexOf(cliCmd) > -1) {
					resolve('Call Success!!!');
				} else {
					reject(cliCmd);
				}
			});
		});
		exit = sinon.spy();
		Hexo = function() {
			this.init = function() {
				return new Promise(function(resolve, reject) {
					init();
					resolve('Init Success!!!');
				});
			};
			this.call = call;
			this.exit = exit;
		};
	});
        validCmds.forEach(function (cmd) {
          it('should call init method of hexo', function(done) {
                  var hexoRoot = '/';
                  var options = {};
                  var callback = done;
                  var isGrunt = false;
                  hexo(hexoRoot, cmd, callback, options, isGrunt, Hexo);
                  expect(init).to.have.been.called;
          });
          it('should call the call method of hexo with arguments cliCmd and options',
          function(done) {
                  var hexoRoot = '/';
                  var options = {};
                  var callback = function () {
                          expect(call).to.have.been.calledWith(cmd, options);
                          done();
                  };
                  var isGrunt = false;
                  hexo(hexoRoot, cmd, callback, options, isGrunt, Hexo);
          });
          it('should call the exit method of hexo', function(done) {
                  var hexoRoot = '/';
                  var options = {};
                  var callback = function () {
                          expect(exit).to.have.been.called;
                          done();
                  };
                  var isGrunt = false;
                  hexo(hexoRoot, cmd, callback, options, isGrunt, Hexo);
          });
        });
	it('should call the exit method of hexo with reject reason',
	function(done) {
		var hexoRoot = '/';
		var cliCmd = 'grunt';
		var options = {};
		var callback = function () {
			expect(exit).to.have.been.calledWith(cliCmd);
			done();
		};
		var isGrunt = false;
		hexo(hexoRoot, cliCmd, callback, options, isGrunt, Hexo);
	});
	it('should throw if called with typeof hexoRoot !== string',
	function() {
		var hexoRoot = 100;
		function falsePath() {
			hexo(hexoRoot);
		}
		expect(falsePath).to.throw(Error);
	});
	it('should throw if called with wrong hexoRoot',
	function() {
		var hexoRoot = '/wrong/';
		function falsePath() {
			hexo(hexoRoot);
		}
		expect(falsePath).to.throw(Error);
	});
});
