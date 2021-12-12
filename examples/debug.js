'use strict'

const { createLogger } = require('../')

createLogger().debug('This is some debug text.', 'Here is some more text...')
