/**
 * @file schema.js
 * Schema for outlook LDAP addressbook
 */

'use strict'

var schema = {

	createEntry: function (base, data, mapping) {
		var entry = new this.AddressBookEntry(base);
		for (var item in data) {
			if (mapping.hasOwnProperty(item) && entry.hasOwnProperty(mapping[item])) {
				entry[mapping[item]] = data[item];
			}
		}
		return entry;
	},

	AddressBookEntry: function AddressBookEntry(base) {
		this.givenName = '';
		this.sn = '';
		this.mail = '';
		this.mobile = '';
		this.objectclass = ['inetOrgPerson', 'organizationalPerson', 'person', 'top'];

		Object.defineProperties(this, {
			dn: {
				enumerable: false,
				configurable: false,
				get: function () {
					return `cn=${this.cn},${this.base}`;
				},
			},
			cn: {
				enumerable: true,
				configurable: false,
				get: function () {
					var lastName = this.initials ? `${this.initials} ${this.sn}` : this.sn;
					return `${this.givenName} ${lastName}`;
				},
			},
			base: {
				enumerable: false,
				configurable: false,
				writable: true,
				value: base,
			},
			initials: {
				enumerable: false,
				configurable: false,
				writable: true,
			},
			displayName: {
				enumerable: true,
				configurable: false,
				get: function () {
					var lastName = this.initials ? `${this.initials} ${this.sn}` : this.sn;
					return `${this.givenName} ${lastName}`;
				},
			},
		});
	}
}

module.exports = schema;