'use strict'

const { createLogger } = require('..')

createLogger({ handleUncaughtException: true })

throw Error('Throwing random error to test logger.')
