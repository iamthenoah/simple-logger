'use strict'

const { invalidOptionMessage } = require('./util')
const { flatten } = require('./format')
const { makeMeLaugh } = require('./jokes')
const Styles = require('./styles')

const defaultOptions = {
	handleUncaughtException: false,
	handleUnhandledRejection: false,
	verbose: 'debug',
	width: 80
}

class Log {
	info
	style
	label

	constructor(info, label = null, style = null) {
		this.info = info
		this.style = style
		this.label = ' ' + label + ' '
	}
}

module.exports = class Logger {
	handleUnhandledRejection
	handleUncaughtException
	verbose
	width

	constructor(options = {}) {
		const { verbose, width, handleUncaughtException, handleUnhandledRejection } = options
		this.handleUnhandledRejection = handleUnhandledRejection ?? defaultOptions.handleUnhandledRejection
		this.handleUncaughtException = handleUncaughtException ?? defaultOptions.handleUncaughtException
		this.verbose = verbose ?? defaultOptions.verbose
		this.width = width ?? defaultOptions.width

		if (verbose && !['debug', 'warnings', 'errors'].includes(verbose)) {
			this.warn(invalidOptionMessage('verbose', verbose, defaultOptions.verbose))
		}
		if (width > process.stdout.columns || width < 40) {
			this.warn(invalidOptionMessage(width, defaultOptions.width))
		}
	}

	log(...info) {
		this.label('LOG', Styles.White, ...info)
	}

	debug(...info) {
		this.label('DEBUG', Styles.Debug, ...info)
	}

	warn(...info) {
		this.label('WARNING', Styles.Yellow, ...info)
	}

	error(...info) {
		this.label('ERROR', Styles.Red, ...info)
	}

	info(...info) {
		this.label('INFO', Styles.Cyan, ...info)
	}

	important(...info) {
		this.label('IMPORTANT', Styles.Magenta, ...info)
	}

	success(...info) {
		info = info.map(i => ' => ' + i)
		this.label('SUCCESS', Styles.Green, ...info)
	}

	data(...info) {
		info = info.map(d => {
			var o = flatten(d)
			return Object.keys(o).map(k => `|  ${k} => ${o[k]}`)
		})
		info.forEach(v => this.label('DATA', Styles.Data, ...['|----'].concat(v)))
	}

	label(label, ...info) {
		this.label(label, Styles.Debug, ...info)
	}

	label(label, style, ...info) {
		info.forEach(i => this.processLog(new Log(i, label, style)))
	}

	space(name, ...info) {
		this.writeLine()
		this[name](...info)
		this.writeLine()
	}

	block(name, ...info) {
		this.writeLine('----------------------------------------')
		this[name](...info)
		this.writeLine('----------------------------------------')
	}

	chuckle() {
		this.space('debug', ...makeMeLaugh())
	}

	processLog(log) {
		if (!log) this.writeLine()

		const { label, info, style } = log
		const tag = style ? style.toColoredLabel(label) : label

		// const sentences = info.length > this.width - 40 ? info.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g) : [info]
		// sentences.forEach(sentence => {
		// const chunks = sentence.match(new RegExp('.{1,' + this.width - 40 + '}', 'g'))
		// })

		if (info.length <= process.stdout.columns - 40) {
			this.writeLine(tag + ' ' + (style ? style.colorForeground(info) : info))
		} else {
			const chunks = info.match(new RegExp('.{1,' + (process.stdout.columns - 50) + '}', 'g'))
			chunks.forEach(l => this.writeLine(tag + ' ' + (style ? style.colorForeground(l) : l)))
		}
	}

	writeLine(text) {
		const p = `[${new Date().toLocaleString()}] ${Styles.Debug.colorForeground('::')}`
		process.stdout.write(`${p} ${text ? text : ''}\n`)
	}
}
