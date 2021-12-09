'use strict'

const { createLogger } = require('../')

createLogger().space('error', new Error('Sorry, an error occured...'))
