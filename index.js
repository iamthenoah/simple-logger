'use strict'

const { invalidOptionMessage } = require('./lib/util')
const logger = require('./lib/logger')
const style = require('./lib/styles')

const defaultOptions = {
	handleUncaughtException: false,
	handleUnhandledRejection: false,
	verbose: 'debug',
	width: 80
}

const createLogger = (config = {}) => {
	const {
		verbose = defaultOptions.verbose,
		width = defaultOptions.width,
		handleUncaughtException = defaultOptions.handleUncaughtException,
		handleUnhandledRejection = defaultOptions.handleUnhandledRejection
	} = config

	const instance = new logger.Logger(verbose, width, handleUncaughtException, handleUnhandledRejection)

	if (verbose && !['debug', 'warnings', 'errors'].includes(verbose)) {
		logger.warn(invalidOptionMessage('verbose', verbose, defaultOptions.verbose))
	}

	if (width > process.stdout.columns || width < 40) {
		logger.warn(invalidOptionMessage(width, defaultOptions.width))
	}

	return instance
}

module.exports = { ...style, createLogger }
