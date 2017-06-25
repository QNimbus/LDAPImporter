/**
 * @file config.js
 * Application configuration
 *
 */

var path = require('path');
var fs = require('fs');

var config = {};
var defaults = {
	csvFile: '',

	ldapProtocol: '',
	ldapHost: '',
	ldapPort: 389,
	ldapBase: '',
	ldapUsername: '',
	ldapPassword: '',

	// Hidden config properties
	csvMapping: {
		'First Name': 'givenName',
		'Last Name': 'sn',
		'E-mail Address': 'mail',
		'Mobile Phone': 'mobile',
		'Home Phone': 'homePhone',
		'Home Address': 'homePostalAddress',
	}
};


// Get version number.
global.version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;

// global absolute root path
global.root_path = path.resolve(__dirname);

var configFilename = path.resolve(global.root_path + '/config/config.js');
if (typeof (global.configuration_file) !== 'undefined') {
	configFilename = path.resolve(global.configuration_file);
}

try {
	fs.accessSync(configFilename, fs.F_OK);
	var c = require(configFilename);
	config = Object.assign(defaults, c);
} catch (e) {
	if (e.code == 'ENOENT') {
		console.error('WARNING! Could not find config file. Please create one. Starting with default configuration.');
	} else if (e instanceof ReferenceError || e instanceof SyntaxError) {
		console.error('WARNING! Could not validate config file. Please correct syntax errors. Starting with default configuration.');
	} else {
		console.error('WARNING! Could not load config file. Starting with default configuration. Error found: ' + e);
	}
	config = Object.assign(defaults);
}

var conf = function () {
	var instance;

	// Singleton instance getter
	function getInstance() {
		// If the instance does not exists, creates it
		if (instance === undefined) {
			instance = getConfigValues();
		}

		return instance;
	}

	function getCommandLineParameter(key, defaultValue = undefined) {
		var index = process.argv.indexOf(key);
		var value = index > -1 ? process.argv[index + 1] : undefined;
		return value !== undefined ? String(value) : defaultValue;
	}

	function getConfigValues() {
		var data = {};

		// Initialize command line arguments
		Object.getOwnPropertyNames(config).forEach((key) => {
			data[key] = getCommandLineParameter(`--${key}`, process.env[key.toUpperCase()] || config[key]);
		})

		// Hide certain properties
		Object.defineProperties(data, {
			csvMapping: {
				enumerable: false,
				configurable: false,
				writable: false,
			}
		});

		// Freeze object
		Object.freeze(data);
		return data;
	}

	// Public API definition
	return {
		getInstance: getInstance
	}
}

module.exports = conf();