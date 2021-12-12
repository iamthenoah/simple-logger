'use strict'

const { createLogger } = require('../')

createLogger().error(new Error('Sorry, an error occured...'))
