'use strict'

const { invalidOptionMessage } = require('./lib/util')
const Logger = require('./lib/logger')

const defaultOptions = {
	handleUncaughtException: false,
	handleUnhandledRejection: false,
	verbose: 'debug',
	width: 80
}

module.exports.createLogger = (config = {}) => {
	const { verbose, width, handleUncaughtException, handleUnhandledRejection } = config

	const logger = new Logger(verbose, width, handleUncaughtException, handleUnhandledRejection)

	if (verbose && !['debug', 'warnings', 'errors'].includes(verbose)) {
		logger.warn(invalidOptionMessage('verbose', verbose, defaultOptions.verbose))
	}

	if (width > process.stdout.columns || width < 40) {
		logger.warn(invalidOptionMessage(width, defaultOptions.width))
	}

	return logger
}
