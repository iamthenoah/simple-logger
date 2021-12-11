'use strict'

const Logger = require('./lib/logger')
const Log = require('./lib/log')

/**
 * Expose core logger objects.
 */
module.exports.Console = Logger

/**
 * Expose log styling options.
 */
module.exports.Log = Log

/**
 * Default logger config options.
 */
const defaultOptions = {
	verbose: process.env.VERBOSE ?? true,
	isDevelopment: process.env.NODE_ENV === 'development',
	minTagWidth: -1,
	excludeWhenNoVerbose: ['debug', 'data', 'log'],
	ignoreErrors: false,
	ignoreWarnings: process.env.NODE_ENV === 'production'
}

/**
 * Default logger log types.
 */
const defaultLogElements = {
	log: Log.Log,
	debug: Log.Debug,
	info: Log.Info,
	data: Log.Data,
	warn: Log.Warn,
	error: Log.Error,
	trace: Log.Trace,
	success: Log.Success,
	important: Log.Important
}

/**
 * Create default instance of a logger.
 */
module.exports.Logger = new Logger(defaultOptions, defaultLogElements)

/**
 * Creates an instance of a Logger with given options.
 * @param {LoggerConstructorOptions?} config Logger config options.
 * @returns {Logger}
 */
module.exports.createLogger = (config = {}, extraLogElements = {}) => {
	// set default params
	Object.keys(defaultOptions).forEach(k => {
		if (config[k] === undefined) config[k] = defaultOptions[k]
	})

	const logElementConfigs = {
		...defaultLogElements,
		...extraLogElements
	}

	const instance = new Logger(config, logElementConfigs)

	const { verbose, isDevelopment, excludeWhenNoVerbose } = config
	if (verbose && !isDevelopment && excludeWhenNoVerbose.length) {
		// instance.warn(
		// 	`Logger verbose set to '${verbose}' while mode is set to development.`,
		// 	`No restrictions set on log types: ${excludeWhenNoVerbose}.`
		// )
	}

	return instance
}
