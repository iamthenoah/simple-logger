'use strict'

const { flatten } = require('./format')
const { makeMeLaugh } = require('./jokes')
const Styles = require('./styles')

class Log {
	info
	style
	label

	constructor(info, label = null, style = null) {
		this.info = info
		this.style = style
		this.label = label
	}
}

class Logger {
	isDevelopment
	verbose
	width

	constructor(isDevelopment, verbose, width, handleUncaughtException, handleUnhandledRejection, handleWarning) {
		this.isDevelopment = isDevelopment
		this.verbose = verbose
		this.width = width

		if (handleUncaughtException) {
			process.on('uncaughtException', reason => this.crash(reason))
		}
		if (handleUnhandledRejection) {
			process.on('unhandledRejection', reason => this.crash(reason))
		}
		if (handleWarning) {
			process.on('warning', reason => this.warn(reason))
		}

		// process.on('exit', code => {
		// 	this.space('debug', `Exiting application with status code '${code}'...`)
		// })
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
		info = info.map(i => ' [!] ' + (this.isDevelopment && i instanceof Error ? i.stack : i))
		this.label('ERROR', Styles.Red, ...info)
	}

	info(...info) {
		this.label('INFO', Styles.Cyan, ...info)
	}

	important(...info) {
		info = info.map(i => Styles.bold(i))
		this.label('IMPORTANT', Styles.Magenta, ...info)
	}

	success(...info) {
		info = info.map(i => ' => ' + i)
		this.label('SUCCESS', Styles.Green, ...info)
	}

	data(...info) {
		info = info.map(d => {
			const o = flatten(d)
			return Object.keys(o).map(k => `|   ${k} => ${o[k]}`)
		})
		info.forEach(v => this.label('DATA', Styles.Data, ...['|{'].concat(v).concat('|}')))
	}

	label(label, ...info) {
		this.label(label, Styles.Debug, ...info)
	}

	label(label, style, ...info) {
		info.forEach(i => this.processLog(new Log(i, label, style)))
	}

	space(name, ...info) {
		if (this.shouldPrintLog(name)) {
			this.writeLine()
			this[name](...info)
			this.writeLine()
		}
	}

	block(name, ...info) {
		if (this.shouldPrintLog(name)) {
			this.writeLine(Styles.Debug.fg('----------------------------------------'))
			this[name](...info)
			this.writeLine(Styles.Debug.fg('----------------------------------------'))
		}
	}

	chuckle() {
		this.space('debug', ...makeMeLaugh())
	}

	start(...preview) {
		this.clear()
		this.writeLine(Styles.Debug.fg('----------------------------------------'))
		preview.forEach(this.writeLine)
		this.writeLine(Styles.Debug.fg('----------------------------------------'))
	}

	crash(reason) {
		this.space('label', 'CRASH', Styles.Red, 'Application crashed...')
		if (reason) this.block('error', Styles.bold('Caused By:'), reason)
        process.exit(1)
	}

	clear() {
		process.stdout.write('\u001Bc')
	}

	processLog(log) {
		const { label, info, style } = log
		if (!this.shouldPrintLog(label)) return
		const tag = style.bg(Styles.bold(Styles.White.fg(' ' + label.toUpperCase() + ' ')))

		// const sentences = info.length > this.width - 40 ? info.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g) : [info]
		// sentences.forEach(sentence => {
		// const chunks = sentence.match(new RegExp('.{1,' + this.width - 40 + '}', 'g'))
		// })

		if (info.length <= process.stdout.columns - 40) {
			this.writeLine(tag + ' ' + (style ? style.fg(info) : info))
		} else {
			const chunks = info.toString().match(new RegExp('.{1,' + (process.stdout.columns - 50) + '}', 'g'))
			chunks.forEach(l => this.writeLine(tag + ' ' + (style ? style.fg(l) : l)))
		}
	}

	writeLine(text = '') {
		process.stdout.write(`[${new Date().toLocaleString()}] ${Styles.Debug.fg('::')} ${text}\n`)
	}

	shouldPrintLog(label) {
		label = label.toLowerCase()
		if (label === 'debug' || label === 'warning' || label === 'data') {
			const showDebug = (label === 'debug' || label === 'data') && this.verbose === 'debug'
			const showWarnings = label === 'warning' && (this.verbose === 'debug' || this.verbose === 'warning')
			return showDebug || showWarnings
		}
		return true
	}
}

module.exports = { Log, Logger }
