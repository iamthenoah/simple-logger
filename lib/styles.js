class LogStyle {
	foreground
	background

	constructor(foreground, background) {
		this.foreground = foreground
		this.background = background
	}

	fg(line) {
		return this.foreground + line + '\x1b[0m'
	}

	bg(line) {
		return this.background + line + '\x1b[0m'
	}
}

const Debug = new LogStyle('\x1b[2m', '\x1b[40m')
const Data = new LogStyle('\x1b[33m', '\x1b[44m')

const Red = new LogStyle('\x1b[31m', '\x1b[41m')
const Green = new LogStyle('\x1b[32m', '\x1b[42m')
const Yellow = new LogStyle('\x1b[33m', '\x1b[43m')
const Blue = new LogStyle('\x1b[34m', '\x1b[44m')
const Magenta = new LogStyle('\x1b[35m', '\x1b[45m')
const Cyan = new LogStyle('\x1b[36m', '\x1b[46m')
const White = new LogStyle('\x1b[37m', '\x1b[47m')

const Bold = info => '\x1b[1m' + info + '\x1b[0m'

module.exports = {
	LogStyle,
	Debug,
	Data,
	Red,
	Green,
	Yellow,
	Blue,
	Magenta,
	Cyan,
	White,
	Bold
}
