'use strict'

const { createLogger } = require('..')
const Log = require('../lib/log')

/**
 * Add a custom startup title with styling.
 * https://patorjk.com/software/taag/#p=testall&f=Rectangles&t=Example...
 */
const title = Log.Blue.colorLog(
	` _____                   _           `,
	`|   __|_ _ ___ _____ ___| |___       `,
	`|   __|_'_| .'|     | . | | -_|_ _ _ `,
	`|_____|_,_|__,|_|_|_|  _|_|___|_|_|_|`,
	`                    |_|              `
)

const author = Log.Red.colorLog(`Author: ${Log.Style.bold('your_name')}`)

const description = Log.Yellow.colorLog('These are logging examples of this library...')

createLogger().start(...title, author, '', description)
