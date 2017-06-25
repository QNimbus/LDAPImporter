/**
 * @file config.sample.js
 * Application configuration
 *
 */

// If a command line parameter is found (e.g. '--csvFile') this value will be used
// When command line parameter is undefined, config will try to look for an environment variable (all uppercase, e.g. 'CSVFILE')
// Otherwise it will use the default value specified below
config = {
	csvFile: __dirname + '/csv/data/contacts.csv',

	ldapProtocol: 'ldap',
	ldapHost: 'hostname',
	ldapPort: 389,
	ldapBase: 'ou=addressBook,dc=example,dc=com',
	ldapUsername: 'uid=admin,cn=users,dc=example,dc=com',
	ldapPassword: 's3cret',

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

module.exports = config;