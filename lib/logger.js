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
	verbose
	width

	constructor(verbose, width, handleUncaughtException, handleUnhandledRejection, handleWarning) {
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

		process.on('exit', code => {
			this.space('debug', 'Exiting application with status code ' + code + '...')
		})
	}

	log(...info) {
		this.label('LOG', Styles.White, ...info)
	}

	debug(...info) {
		if (this.verbose === 'debug') {
			this.label('DEBUG', Styles.Debug, ...info)
		}
	}

	warn(...info) {
		if (this.verbose === 'debug' || this.verbose === 'warnings') {
			this.label('WARNING', Styles.Yellow, ...info)
		}
	}

	error(...info) {
		info = info.map(i => ' [!] ' + i)
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
		if (this.verbose === 'debug') {
			info = info.map(d => {
				const o = flatten(d)
				return Object.keys(o).map(k => `|   ${k} => ${o[k]}`)
			})
			info.forEach(v => this.label('DATA', Styles.Data, ...['|{'].concat(v).concat('|}')))
		}
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
		this.writeLine(Styles.Debug.fg('----------------------------------------'))
		this[name](...info)
		this.writeLine(Styles.Debug.fg('----------------------------------------'))
	}

	chuckle() {
		this.space('debug', ...makeMeLaugh())
	}

	start(...preview) {
		process.stdout.write('\u001Bc')
		this.block(preview)
	}

	crash(reason) {
		this.space('label', 'CRASH', Styles.Red, 'Application crashed...')
		if (reason) this.block('error', Styles.bold('Caused By:'), reason)
	}

	processLog(log) {
		const { label, info, style } = log
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

	writeLine(text) {
		const p = `[${new Date().toLocaleString()}] ${Styles.Debug.fg('::')}`
		process.stdout.write(`${p} ${text ? text : ''}\n`)
	}
}

module.exports = { Log, Logger }
