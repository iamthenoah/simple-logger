'use strict'

const { createLogger } = require('..')
const Log = require('../lib/log')

/**
 * Accepts and escape sequence to pass to console.
 *
 * ... For example, `\x1b[31m` is an escape sequence that will be intercepted
 * by your terminal and instructs it to switch to the red color.
 * In fact, \x1b is the code for the non-printable control character escape.
 * Escape sequences dealing only with colors and styles are also known
 * as ANSI escape code and are standardized, so therefore they (should)
 * work on any platform.
 *
 * SOURCE - https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
 */
const customStyle = Log.Style.create('\x1b[93;44m', '\x1b[45m')

/**
 * Creating custom logging element.
 */
const customElement = new Log.Element('Custom Tag', customStyle, '> Log start', '|', '< Log end')

/**
 * Custom log types can also be registered when creating an instance of a logger.
 * Here, we register `api` as an example using the above element object.
 */
const logger = createLogger({ /* logger options goes here */ }, { api: customElement })

logger.api('You can Also make your own custom logs.')
