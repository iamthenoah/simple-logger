'use strict'

const { flatten, truncate } = require('./format')
const { makeMeLaugh } = require('./jokes')
const Log = require('./log')

module.exports = class Logger {
	verbose
	isDevelopment
	minTagWidth
	excludeWhenNoVerbose

	constructor(config, logElementConfigs = {}) {
		this.verbose = config.verbose
		this.isDevelopment = config.isDevelopment
		this.minTagWidth = config.minTagWidth
		this.excludeWhenNoVerbose = config.excludeWhenNoVerbose

		if (!logElementConfigs) {
			throw new Error(`Missing log type elements.`)
		}

		// load log elements.
		Object.keys(logElementConfigs).forEach(method => {
			this[method] = (...info) => this.processLog(logElementConfigs[method], ...info)
		})

		if (!config.ignoreErrors) {
			process.on('uncaughtException', reason => this.crash(reason))
			process.on('unhandledRejection', reason => this.crash(reason))
		}
		if (!config.ignoreWarnings) {
			process.on('warning', reason => this.warn(reason))
		}
	}

	group(name, ...info) {
		this[name](...this.separate('-'.repeat((process.stdout.columns - 30) * 0.5), ...info))
	}

	space(name, ...info) {
		this[name](...this.separate('', ...info))
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
		if (reason) this.group('error', Log.Style.bold('Caused By:'), reason)
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
		if (!this.verbose && this.excludeWhenNoVerbose.includes(tag)) return

		if (!logElement || !logElement.style) {
			throw Error(`Invalid Log.Element provided to logger (${logElement}).`)
		}

		const { tag, style, prefix, prepend, append } = logElement
		const label = this.formatTag(tag, style)

		if (prepend) this.write(`${label} ${style.colorLog(prepend)}`)
		info.forEach(t => {
			t = Array.isArray(t) || typeof t === 'object' ? flatten(t) : t
			const w = (process.stdout.columns - 30) * 0.75
			const l = truncate(t.toString(), w).map(l => label + ' ' + style.colorLog(prefix ? prefix + ' ' + l : l))
			l.forEach(this.write)
		})
		if (append) this.write(`${label} ${style.colorLog(append)}`)
	}

	formatTag(tag, style) {
		const isEven = tag.trim().length % 2 === 0
		const f = Math.max(this.minTagWidth - tag.length / 2, 1)
		const b = f <= 1 || isEven ? f : f + 1
		const label = ' '.repeat(f) + tag + ' '.repeat(b)
		return style.colorTag(label.toUpperCase())
	}
}
