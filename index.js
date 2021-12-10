'use strict'

const { invalidOptionMessage } = require('./lib/util')
const logger = require('./lib/logger')

/**
 * Expose log styling options.
 */
module.exports.Style = require('./lib/styles')

/**
 * Expose logger object.
 */
module.exports.Logger = logger

/**
 * Creates an instance of a Logger with given options.
 * @param {LoggerOptions?} config Logger config options.
 * @returns {Logger}
 */
module.exports.createLogger = (config = {}) => {
	const {
		verbose = 'debug',
		width = 80,
		handleUncaughtException = false,
		handleUnhandledRejection = false,
		handleWarning = false
	} = config

	const instance = new logger.Logger(verbose, width, handleUncaughtException, handleUnhandledRejection, handleWarning)

	if (!['debug', 'warnings', 'errors'].includes(verbose)) {
		instance.warn(invalidOptionMessage('verbose', verbose, 'debug'))
	}
	if (width > process.stdout.columns || width < 40) {
		instance.warn(invalidOptionMessage('wdith', width, 80))
	}

	return instance
}
