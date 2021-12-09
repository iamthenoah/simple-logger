'use strict'

const { createLogger } = require('../')

createLogger().space('debug', 'This is some debug text.', 'Here is some more text...')
