'use strict'

const { createLogger } = require('../')

createLogger().block('info', `Look at that! I'm in a block that's cool.`)
