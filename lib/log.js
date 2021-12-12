'use strict'

class Element {
	tag
	style
	prefix
	prepend
	append

	constructor(tag, style, prepend, prefix, append) {
		this.tag = tag
		this.style = style ?? this.Grey
		this.prefix = prefix ?? null
		this.prepend = prepend ?? null
		this.append = append ?? null
	}

	static create(tag, style) {
		return new Element(tag, style, null, null, null)
	}
}

class Style {
	logText
	logBackground
	tagText
	tagBackground

	constructor(logText, logBackground, tagText, tagBackground) {
		this.logText = logText
		this.logBackground = logBackground
		this.tagText = tagText
		this.tagBackground = tagBackground
	}

	colorLog(...info) {
		return info.map(i => this.logBackground + this.logText + i + '\x1b[0m')
	}

	colorTag(...info) {
		return info.map(i => Style.bold(this.tagBackground + this.tagText + i) + '\x1b[0m')
	}

	static bold(...info) {
		return info.map(i => '\x1b[1m' + i + '\x1b[0m')
	}

	static create(logText, tagBackground) {
		return new Style(logText, '\x1b[0m', '\x1b[37m', tagBackground)
	}
}

module.exports.Style = Style
module.exports.Element = Element

module.exports.Grey = Style.create('\x1b[2m', '\x1b[40m')
module.exports.Red = Style.create('\x1b[31m', '\x1b[41m')
module.exports.Green = Style.create('\x1b[32m', '\x1b[42m')
module.exports.Yellow = Style.create('\x1b[33m', '\x1b[43m')
module.exports.Blue = Style.create('\x1b[34m', '\x1b[44m')
module.exports.Magenta = Style.create('\x1b[35m', '\x1b[45m')
module.exports.Cyan = Style.create('\x1b[36m', '\x1b[46m')
module.exports.White = Style.create('\x1b[37m', '\x1b[47m')

module.exports.Data = new Element('DATA', Style.create('\x1b[33m', '\x1b[44m'), '|{', '|  ', '|}')
module.exports.Log = Element.create(null, this.Grey)
module.exports.Info = Element.create('INFO', this.Cyan)
module.exports.Debug = Element.create('DEBUG', this.Grey)
module.exports.Warn = Element.create('WARN', this.Yellow)
module.exports.Error = new Element('ERROR', this.Red, null, '>')
module.exports.Trace = new Element('TRACE', this.Red, null, '|')
