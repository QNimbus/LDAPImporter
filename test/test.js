/**
 * @file test.js
 * Mocha test suites for this application
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();

var csv = require(__dirname + '/../csv.js');
var config = require('../config.js');
var ldap = require(__dirname + '/../ldap.js');

var csvTestFile = __dirname + '/data/csv.test';
var csvTestString = 'firstName,lastName,email\nJohn,Smith,john.smith@foobar.com';

if (!String.prototype.escapeNewLine) {
	String.prototype.escapeNewLine = function () {
		return this.replace(/\n/g, '\\n');
	}
}

describe('config', function () {
	describe('using the "--csvFile testFile" command line parameter', function () {
		process.argv.push('--csvFile', 'testFile');
		it('#should return "testFile"', function () {
			var _config = config.getInstance();
			assert.equal('testFile', _config.csvFile);
		})
	});
});

describe('csv', function () {
	describe(`.parseString("${csvTestString.escapeNewLine()}")`, function () {
		var promise = csv.parseString(csvTestString);
		it('should return a vavlid JSON object when given a CSV string', function () {
			promise.should.eventually.be.fulfilled;
			return promise.then(result => {
				(typeof result).should.equal('object');
				result[0]['firstName'].should.equal('John');
				result[0]['lastName'].should.equal('Smith');
				result[0]['email'].should.equal('john.smith@foobar.com');
			})
		})
	});
	describe(`.parseFile("${csvTestFile}")`, function () {
		var promise = csv.parseFile(csvTestFile);
		it('should return a vavlid JSON object when given a CSV file', function () {
			promise.should.eventually.be.fulfilled;
			return promise.then(result => {
				(typeof result).should.equal('object');
				result[0]['firstName'].should.equal('John');
				result[0]['lastName'].should.equal('Smith');
				result[0]['email'].should.equal('john.smith@foobar.com');
			})
		})
		it('should return a "File not exists" error', function () {
			return expect(csv.parseFile('')).to.eventually.be.rejectedWith(Error, 'File not exists');
		})
	});
});

describe('ldap', function () {
	this.timeout(10000);
	describe('.connect("ldap://foo.bar:389", "username", "password")', function () {
		it('should raise an exception when connectiong to a non-existing domain name LDAP server', function () {
			return expect(ldap.connect('ldap://foo.bar:389', 'username', 'password'))
				.to.eventually.be.rejectedWith(Error, 'getaddrinfo ENOTFOUND foo.bar foo.bar:389');
		});
	});
	describe('.connect("http://foo.bar:389", "username", "password")', function () {
		it('should raise an exception when connectiong to an invalid URL', function () {
			return expect(ldap.connect('http://foo.bar:389', 'username', 'password'))
				.to.eventually.be.rejectedWith(Error, 'http://foo.bar:389 is an invalid LDAP url (protocol)');
		});
	});
	describe('.connect("ldap://localhost:11389", "username", "password")', function () {
		it('should raise an exception when connectiong to URL without a valid server listening', function () {
			return expect(ldap.connect('ldap://localhost:11389', 'username', 'password'))
				.to.eventually.be.rejectedWith(Error, 'connect ECONNREFUSED 127.0.0.1:11389');
		});
	});
});