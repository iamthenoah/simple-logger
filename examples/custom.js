'use strict'

const Styles = require('../lib/styles')
const Logger = require('../lib/logger')

const logger = new Logger({ verbose: 'debug' })

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
const customStyle = new Styles.LogStyle('\x1b[34m', '\x1b[45m')

logger.label('Custom Tag', customStyle, 'You can Also make your own custom logs.')
