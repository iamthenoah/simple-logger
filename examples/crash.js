'use strict'

const { createLogger } = require('..')

/**
 * Simulate Application crash.
 * 'handleUncaughtException' set to `true` to allow the logger to handle `UncaughtException` errors.
 * 'isDevelopment' set to `true` to allow the logger to display the error stacktraces.
 */
createLogger({ handleErrors: true, isDevelopment: true })

throw Error('Throwing random error to test logger.')
