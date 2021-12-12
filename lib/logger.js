'use strict'

const { flatten, truncate } = require('./format')
const { makeMeLaugh } = require('./jokes')
const Log = require('./log')

module.exports = class Logger {
	verbose
	isDevelopment
	minTagWidth
	excludeWhenNoVerbose

	constructor(config, extraLogTypes = {}) {
		this.verbose = config.verbose
		this.isDevelopment = config.isDevelopment
		this.minTagWidth = config.minTagWidth
		this.excludeWhenNoVerbose = config.excludeWhenNoVerbose

		// load extra log elements.
		Object.keys(extraLogTypes).forEach(method => {
			this[method] = (...info) => this.processLog(extraLogTypes[method], ...info)
		})

		if (!config.ignoreErrors) {
			process.on('uncaughtException', reason => this.crash(reason))
			process.on('unhandledRejection', reason => this.crash(reason))
		}
		if (!config.ignoreWarnings) {
			process.on('warning', reason => this.warn(reason))
		}
	}

	log(...info) {
		this.processLog(Log.Log, ...info)
	}

	debug(...info) {
		this.processLog(Log.Debug, ...info)
	}

	info(...info) {
		this.processLog(Log.Info, ...info)
	}

	data(...info) {
		info.forEach(i => this.processLog(Log.Data, flatten(i)))
	}

	warn(...info) {
		this.processLog(Log.Warn, ...info)
	}

	error(...info) {
		info.forEach(e => this.processLog(Log.Error, e instanceof Error ? e.message : e))
	}

	trace(...info) {
		info.forEach(e => this.processLog(Log.Trace, e instanceof Error ? e.stack : e))
	}

	group(name, ...info) {
		const s = '-'.repeat((process.stdout.columns - 30) * 0.5)
		this[name](...[s].concat(info).concat(s))
	}

	start(...info) {
		this.clear()
		this.group('log', ...info)
	}

	crash(reason) {
		this.group('error', Log.Style.bold('APPLICATION CRASHED.'))
		if (reason && reason instanceof Error) {
			this.error(Log.Style.bold('Caused By: ') + Log.Red.colorLog(reason))
			this.trace(...reason.stack.split('\n'))
		} else {
			this.group('error', Log.Style.bold('Caused By: ') + (reason ? Log.Red.colorLog(reason) : 'Unkown.'))
		}
		process.exit(1)
	}

	chuckle() {
		this.debug(...makeMeLaugh())
	}

	clear() {
		process.stderr.write('\u001Bc')
	}

	write(line) {
		process.stdout.write(`[${new Date().toLocaleString()}] ${Log.Grey.colorLog('::')} ${line}\n`)
	}

	processLog(logElement, ...info) {
		if (!this.verbose && this.excludeWhenNoVerbose.includes(tag)) return

		if (!logElement || !logElement.style) {
			throw Error(`Invalid Log.Element provided to logger (${logElement}).`)
		}

		const { tag, style, prefix, prepend, append } = logElement
		const p = tag ? this.formatTag(tag, style) : null
		const label = p ? p + ' ' : ''

		if (prepend) this.write(label + style.colorLog(prepend))

		info.forEach(t => {
			const m = process.stdout.columns - 50
			const n = truncate(t.toString(), m * 0.075, m)
			n.forEach(l => {
				this.write(label + style.colorLog(prefix ? prefix + ' ' + l : l))
			})
		})
		if (append) this.write(label + style.colorLog(append))
	}

	formatTag(tag, style) {
		const isEven = tag.trim().length % 2 === 0
		const f = Math.max(this.minTagWidth - tag.length / 2, 1)
		const b = f <= 1 || isEven ? f : f + 1
		const l = ' '.repeat(f) + tag + ' '.repeat(b)
		return style.colorTag(l.toUpperCase())
	}
}
