/**
 * @file ldap.js
 * Module connect to an LDAP database instance
 *
 */

'use strict'

const assert = require('assert');
const ldap = require('ldapjs');

var mapping = {
	'name': 'cn',
	'firstName': 'givenName',
	'middleName': 'initials',
	'lastName': 'sn',
	'displayName': 'displayName',
	'email': 'mail',
	'mobilePhone': 'mobile',
	'homePhone': 'homePhone',
}

var LDAP = function (url) {
	var client;

	function createQuery(property, value) {
		var property = mapping.hasOwnProperty(property) ? mapping[property] : property;
		var queryString = `${property}=${value}`;

		if (queryString.length < 1) {
			throw new Error('Invalid LDAP query');
		}
		return `(${queryString})`;
	}

	function connect(url, username, password) {
		return new Promise((resolve, reject) => {
			client = ldap.createClient({ url: url });
			client.on('error', error => {
				reject(error);
			})
			client.bind(username, password, function (error) {
				if (error) {
					reject(error)
				} else {
					resolve();
				}
			});
		});
	}

	function search(base, options) {
		return new Promise((resolve, reject) => {
			client.search(base, options, function (error, response) {
				var data = [];
				if (error) {
					reject(error)
				}

				response.on('searchEntry', function (entry) {
					data.push(entry.object);
				});
				response.on('searchReference', function (referral) {
					data.push(referral.uris.join());
				});
				response.on('error', function (error) {
					data.push(error);
					reject(error);
				});
				response.on('end', function (result) {
					result.status === 0 ? resolve(data) : reject(result.status);
				});
			});
		})
	}

	function add(dn, entry) {
		return new Promise((resolve, reject) => {
			client.add(dn, entry, function (error) {
				if (error) {
					reject(error);
				} else {
					resolve({ success: true, entry: entry, message: `Entry added to database (${entry.cn})` });
				}
			})
		});
	};

	var disconnect = function () {
		return new Promise((resolve, reject) => {
			if (client && client.unbind && typeof client.unbind === 'function') {
				client.unbind(function (error) {
					if (error) {
						reject(error);
					} else {
						resolve();
					}
				});
			}
		})
	};

	// Expose API
	return {
		connect: connect,
		search: search,
		add: add,
		disconnect: disconnect,
		createQuery: createQuery,
	};
}

module.exports = new LDAP();