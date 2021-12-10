'use strict'

const { invalidOptionMessage } = require('./lib/util')
const logger = require('./lib/logger')
const style = require('./lib/styles')

/**
 * Expose logger object.
 */
module.exports.Logger = logger

/**
 * Expose log styling options.
 */
module.exports.Style = style

/**
 * Default logger config options.
 */
const defaultOptions = {
	verbose: 'debug',
	width: 80,
	handleUncaughtException: false,
	handleUnhandledRejection: false,
	handleWarning: false
}

/**
 * Creates an instance of a Logger with given options.
 * @param {LoggerOptions?} config Logger config options.
 * @returns {Logger}
 */
module.exports.createLogger = (config = {}) => {
	const {
		verbose = defaultOptions.verbose,
		width = defaultOptions.width,
		handleUncaughtException = defaultOptions.handleUncaughtException,
		handleUnhandledRejection = defaultOptions.handleUnhandledRejection,
		handleWarning = defaultOptions.handleWarning
	} = config

	const instance = new logger.Logger(verbose, width, handleUncaughtException, handleUnhandledRejection, handleWarning)

	if (!['debug', 'warning', 'error'].includes(verbose)) {
		instance.warn(invalidOptionMessage('verbose', verbose, defaultOptions.verbose))
	}
	if (width > process.stdout.columns || width < 40) {
		instance.warn(invalidOptionMessage('width', width, defaultOptions.width))
	}

	return instance
}
