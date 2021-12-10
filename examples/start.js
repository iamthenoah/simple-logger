'use strict'

const { createLogger, Style } = require('..')

/**
 * Add a custom startup title with styling.
 * https://patorjk.com/software/taag/#p=testall&f=Rectangles&t=Example...
 */

const description = Style.Yellow.fg('These are logging examples of this library...')

const author = Style.Red.fg(`Author: ${Style.bold('your_name')}`)

createLogger().start(
	Style.Blue.fg(` _____                   _           `),
	Style.Blue.fg(`|   __|_ _ ___ _____ ___| |___       `),
	Style.Blue.fg(`|   __|_'_| .'|     | . | | -_|_ _ _ `),
	Style.Blue.fg(`|_____|_,_|__,|_|_|_|  _|_|___|_|_|_|`),
	Style.Blue.fg(`                    |_|              `),
	'',
	description,
    '',
    author
)
