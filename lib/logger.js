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

module.exports = class Logger {
	handleUnhandledRejection
	handleUncaughtException
	verbose
	width

	constructor(verbose, width, handleUncaughtException, handleUnhandledRejection) {
		this.handleUnhandledRejection = handleUnhandledRejection
		this.handleUncaughtException = handleUncaughtException
		this.verbose = verbose
		this.width = width
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
		info = info.map(i => ' [!] ' + i)
		this.label('ERROR', Styles.Red, ...info)
	}

	info(...info) {
		this.label('INFO', Styles.Cyan, ...info)
	}

	important(...info) {
		info = info.map(i => Styles.Bold(i))
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
		this.writeLine(Styles.Debug.fg('----------------------------------------'))
		this[name](...info)
		this.writeLine(Styles.Debug.fg('----------------------------------------'))
	}

	chuckle() {
		this.space('debug', ...makeMeLaugh())
	}

	processLog(log) {
		if (!log) this.writeLine()

		const { label, info, style } = log
		const tag = style.bg(Styles.Bold(Styles.White.fg(' ' + label.toUpperCase() + ' ')))

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
