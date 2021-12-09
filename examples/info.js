'use strict'

const Logger = require('../lib/logger')

const logger = new Logger({ verbose: 'debug' })

logger.space('info', 'Here is some information you might be intrersted in.')
