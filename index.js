/**
 * @file index.js
 * Main script for LDAPImporter
 *
 * This script imports a csv file and syncs it to an LDAP database
 */

'use strict'

const config = require('./config').getInstance();
const csv = require(__dirname + '/csv');
const ldap = require(__dirname + '/ldap');
const schema = require(__dirname + '/schema');

var options = {
	filter: `(&${ldap.createQuery('name', 'John Smith')}${ldap.createQuery('mail', 'john.smith@foobar.net')})`,
	scope: 'one',
	attributes: [],
};

async function main() {
	console.log('Starting...');
	try {
		await ldap.connect(`${config.ldapProtocol}://${config.ldapHost}:${config.ldapPort}`, config.ldapUsername, config.ldapPassword);
		console.log('Connection established');

		// var searchResults = await ldap.search(config.ldapBase, options);
		// console.log(searchResults);
		var csvData = await csv.parseFile(config.csvFile);

		var results = await Promise.all(csvData.map((current, index, array) => {
			var entry = schema.createEntry(config.ldapBase, current, config.csvMapping);
			return ldap.add(entry.dn, entry);
		}));
		console.log(`Added ${results.length} new entries to the database`);
	} catch (error) {
		// Handle errors
		console.log(`Error: ${error.message}`);
	} finally {
		console.log('Closing connection...');
		await ldap.disconnect();
	}
}

main();