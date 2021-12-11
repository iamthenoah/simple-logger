'use strict'

const logger = require('./lib/logger')
const style = require('./lib/styles')

/**
 * Expose core logger objects.
 */
module.exports.Console = logger

/**
 * Expose log styling options.
 */
module.exports.Style = style

/**
 * Default logger config options.
 */
const defaultOptions = {
	verbose: process.env.VERBOSE ?? true,
	isDevelopment: process.env.NODE_ENV === 'development',
	ignoreWarnings: process.env.NODE_ENV === 'production',
	excludeWhenNoVerbose: ['debug', 'data', 'log'],
	stdout: process.stdout,
	stderr: process.stderr
}

/**
 * Create default instance of a logger.
 */
module.exports.Logger = new logger.Logger(defaultOptions)

/**
 * Creates an instance of a Logger with given options.
 * @param {LoggerConstructorOptions?} config Logger config options.
 * @returns {Logger}
 */
module.exports.createLogger = (config = {}) => {
	// set default params
	Object.keys(defaultOptions).forEach(k => {
		config[k] === undefined ? (config[k] = defaultOptions[k]) : null
	})

	const instance = new logger.Logger()

	if (verbose && !isDevelopment) {
		instance.warn(
			`Logger verbose set to '${verbose}' while mode is set to development.`,
			`No restrictions set on log types ${excludeWhenNoVerbose}.`
		)
	}

	return instance
}
