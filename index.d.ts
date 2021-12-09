export type Log = {
	info: any
	label: string
	style: LogStyle
}

export type LogStyle = {
	fg(line: string): string
	bg(line: string): string
}

export type Logger = {
	debug(...info: any): void
	warn(...info: any): void
	error(...info: any): void
	info(...info: any): void
	imporant(...info: any): void
	success(...info: any): void
	data(...info: any): void
	label(label: string, style: LogStyle, ...info: any): void
	block(...info: any): void
	space(...info: any): void
}

export type LoggerOptions = {
	verbose: 'debug' | 'warnigs' | 'errors'
	width: number
	handleUncaughtException: boolean
	handleUnhandledRejection: boolean
}

export function createLogger(options: LoggerOptions): Logger
