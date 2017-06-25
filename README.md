[![Build Status](https://travis-ci.org/QNimbus/LDAPImporter.svg?branch=master)](https://travis-ci.org/QNimbus/LDAPImporter)
[![dependencies](https://david-dm.org/QNimbus/LDAPImporter.svg)](https://david-dm.org/QNimbus/LDAPImporter)
[![devDependencies](https://david-dm.org/QNimbus/LDAPImporter/dev-status.svg)](https://david-dm.org/QNimbus/LDAPImporter?type=dev)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/1078/badge)](https://bestpractices.coreinfrastructure.org/projects/1078)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

# LDAPImporter

Simple script to read from a CSV file and import rows into an LDAP database. Script was made specificaly to import addressbook contacts into and LDAP database for use with MS Outlook

## Table Of Contents

- [Installing](#installing)
- [Running the tests](#running-the-tests)
- [Deployment](#deployment)
- [Configuration](#configuration)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

- Node v7.0+

## Installing

Clone the GitHub repository locally by executing :

`git clone git@github.com:QNimbus/LDAPImporter.git`

Install Node dependencies with :

`npm install`

## Running the tests

Running the unit tests is done with :

`npm test`

## Deployment

The script can be run with the following command:

`npm start -- --csvFile ./contacts.csv` or `node --csvFile ./contacts.csv` (assuming the contacts.csv file exists)

**Note** You can specificy command line parameters on the commandline, the environment or in the config file. See: configuration

## Configuration

Copy the `config.sample.js` to `config.js` file and edit it with the parameters for your specific configuration.

| Option           | Description
|----------------- |-----------
| `csvFile` | *Required* File location of the CSV file relative to the script<br><br>**Default value:** `contacts.csv`<br>**Type:** `string`<br>
| `ldapProtocol` | *Required* Protocol used to connect tp the database (`ldap` or `ldaps`)<br><br>**Default value:** `ldap`<br>**Type:** `string`<br>
| `ldapHost` | *Required* Hostname or IP address of the LDAP database server<br><br>**Type:** `string`<br>
| `ldapPort` | *Required* TCP port number of LDAP database<br><br>**Default value:** `389`<br>**Type:** `int`<br>
| `ldapBase` | *Required* DN of the location in de LDAP database to store imported values<br><br>**Example:** `ou=addressBook,dc=example,dc=com`<br>**Type:** `string`<br>
| `username` | *Required* Username for authentication<br><br>**Example:** `uid=admin,cn=users,dc=example,dc=com`<br>**Type:** `string`<br>
| `password` | *Required* Password for authentication<br><br>**Type:** `string`<br>

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **B. van Wetten** - *Initial work* - [BeSquared](https://besqua.red)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details