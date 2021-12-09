'use strict'

const Logger = require('../lib/logger')

const logger = new Logger({ verbose: 'debug' })

logger.block('info', `Look at that! I'm in a block that's cool.`)
