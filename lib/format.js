'use strict'

/**
 * Flattens input `object|array`.
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

/**
 * Truncates input `full` string into arrays.
 * @param {string} full full string.
 * @returns {string[]}
 */
const truncate = (full, wordCount, maxLength) => {
	if (full.length <= maxLength) return [full]
	const lines = full.split(' ')
	const arr = []
	while (lines.length) {
		arr.push(lines.splice(0, wordCount))
	}
	return arr.map(w => w.join(' '))
}

module.exports = { flatten, truncate }
