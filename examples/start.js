'use strict'

const { createLogger, Style } = require('..')

/**
 * Add a custom startup title with styling.
 * https://patorjk.com/software/taag/#p=testall&f=Rectangles&t=Example...
 */

const title = Style.Blue.fg(
	` _____                   _           `,
	`|   __|_ _ ___ _____ ___| |___       `,
	`|   __|_'_| .'|     | . | | -_|_ _ _ `,
	`|_____|_,_|__,|_|_|_|  _|_|___|_|_|_|`,
	`                    |_|              `
)

const author = Style.Red.fg(`Author: ${Style.bold('your_name')}`)

const description = Style.Yellow.fg('These are logging examples of this library...')

createLogger().start(...title, '', author, '', description)
