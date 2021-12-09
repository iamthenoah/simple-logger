'use strict'

/**
 * Flattens input object|array.
 * @param {string} data Input data.
 * @param {object} record Recursive data.
 * @returns {object}
 */
const flatten = (data, record = {}) => {
	Object.entries(data).forEach(entry => {
		const key = entry[0]
		const value = entry[1]

		if (typeof value === 'object' && !Array.isArray(value)) {
			Object.assign(record, flatten(value, record))
		} else {
			record[key] = value
		}
	})

	return record
}

module.exports = { flatten }
