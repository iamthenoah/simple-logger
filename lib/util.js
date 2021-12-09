'use strict'

/**
 * Helper function for getting invalid options provided error message.
 * @param {string} option Given option.
 * @param {string} defaultOption Defaulting value.
 * @returns {string}
 */
const invalidOptionMessage = (option, inputOption, defaultOption) => {
	return `Invalid ${option} option provided (${inputOption}). Defaulting with '${defaultOption}'.`
}

module.exports = { invalidOptionMessage }
