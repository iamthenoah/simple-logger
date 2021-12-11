'use strict'

const { flatten, truncate } = require('./format')
const { makeMeLaugh } = require('./jokes')
const Log = require('./log')

module.exports = class Logger {
	verbose
	isDevelopment
	minTagWidth
	restrictedLogTypes

	constructor(
		verbose,
		isDevelopment,
		minTagWidth,
		restrictedLogTypes,
		ignoreErrors,
		ignoreWarnings,
		logElementConfigs
	) {
		this.verbose = verbose
		this.isDevelopment = isDevelopment
		this.minTagWidth = minTagWidth
		this.restrictedLogTypes = restrictedLogTypes

		if (!ignoreErrors) {
			process.on('uncaughtException', reason => this.crash(reason))
			process.on('unhandledRejection', reason => this.crash(reason))
		}
		if (!ignoreWarnings) {
			process.on('warning', reason => this.warn(reason))
		}

		// load log elements.
		Object.keys(logElementConfigs).forEach(k => {
			this[k] = (...info) => this.processLog(logElementConfigs[k], ...info)
		})

		// load all log levels.
		// Object.values(['log', 'debug', 'info', 'data', 'warn', 'error', 'trace', 'success', 'important']).forEach({
		// 	method => (this[method] = (...info) => this.processLog(logElementConfigs[method], ...info))
		// )
	}

	group(name, ...info) {
		this[name](...separate('-'.repeat((process.stdout.columns - 30) * 0.75), ...info))
	}

	space(name, ...info) {
		this[name](...separate('', ...info))
	}

	chuckle() {
		this.space('debug', ...makeMeLaugh())
	}

	start(...info) {
		this.clear()
		this.space('group', 'debug', ...info)
	}

	crash(reason) {
		this.space('error', 'CRASH', 'Application crashed...')
		if (reason) this.group('error', Styles.bold('Caused By:'), reason)
		process.exit(1)
	}

	clear() {
		process.stderr.write('\u001Bc')
	}

	separate(sep, ...info) {
		return [sep].concat(info).concat(sep)
	}

	write(line) {
		process.stdout.write(`[${new Date().toLocaleString()}] ${Log.Grey.colorLog('::')} ${line}\n`)
	}

	processLog(logElement, ...info) {
		if (!logElement) throw Error(`Invalid 'Log.Style' provided to logger (${logElement}).`)
		const { tag, style, prefix, prepend, append } = logElement
		if (!this.verbose && this.restrictedLogTypes.includes(tag)) return
		const e = tag.length % 2 === 0 ? tag.length : tag.length + 1
		const l = Math.max((this.minTagWidth - e) / 2, 1)
		var label = ' '.repeat(l) + tag + ' '.repeat(l)
		label = style.colorTag(label.toUpperCase())
		if (prepend) this.write(`${label} ${style.colorLog(prepend)}`)
		info.forEach(t => {
			t = Array.isArray(t) || typeof t === 'object' ? flatten(t) : t
			const w = (process.stdout.columns - 30) * 0.75
			const l = truncate(t.toString(), w).map(l => label + ' ' + style.colorLog(prefix ? prefix + ' ' + l : l))
			l.forEach(this.write)
		})
		if (append) this.write(`${label} ${style.colorLog(append)}`)
	}
}
