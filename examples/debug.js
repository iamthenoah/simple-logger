'use strict'

const Logger = require('../lib/logger')

const logger = new Logger({ verbose: 'debug' })

logger.space('debug', 'This is some debug text.', 'Here is some more text...')