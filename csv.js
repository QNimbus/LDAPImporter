/**
 * @file csv.js
 * Module to return a CSV promise
 *
 */

'use strict'

const csvtojson = require('csvtojson');

var csv = {
	parseFile: function (csvFile) {
		return new Promise((resolve, reject) => {
			csvtojson()
				.fromFile(csvFile)
				.on('error', (error) => {
					reject(error);
				})
				.on('end_parsed', (jsonObject) => {
					resolve(jsonObject);
				})
		});
	},
	parseString: function (csvString) {
		return new Promise((resolve, reject) => {
			csvtojson()
				.fromString(csvString)
				.on('error', (error) => {
					reject(error);
				})
				.on('end_parsed', (jsonObject) => {
					resolve(jsonObject);
				})
		});
	}
}

module.exports = csv;