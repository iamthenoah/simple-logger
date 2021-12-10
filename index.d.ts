type LogType = 'debug' | 'warn' | 'error' | 'info' | 'important' | 'success' | 'data' | 'label' | 'chuckle'

export type Verbose = 'debug' | 'warning' | 'error'

export type LoggerOptions = {
    isDevelopment?: boolean
	verbose?: Verbose
	width?: number
	handleUncaughtException?: boolean
	handleUnhandledRejection?: boolean
	handleWarning?: boolean
}

export function createLogger(options?: LoggerOptions): Logger.Logger

export namespace Logger {
	export type Log = {
		info: any
		label: string
		style: Style.LogStyle
	}

	export interface Logger {
		debug(...info: any): void
		warn(...info: any): void
		error(...info: any): void
		info(...info: any): void
		imporant(...info: any): void
		success(...info: any): void
		data(...info: any): void
		label(label: string, style: Style.LogStyle, ...info: any): void
		label(label: string, ...info: any): void
		space(name: LogType, ...info: any): void
		block(name: LogType, ...info: any): void
		chuckle(): void
		crash(reason: any): void
		start(...preview: any): void
		clear(): void
	}
}

export namespace Style {
	export class LogStyle {
		constructor(fg: string, bg: string)
		fg(line: string): string
		bg(line: string): string
	}

	export function bold(line: string): string

	export const Debug: LogStyle
	export const Data: LogStyle

	export const Red: LogStyle
	export const Green: LogStyle
	export const Yellow: LogStyle
	export const Blue: LogStyle
	export const Magenta: LogStyle
	export const Cyan: LogStyle
	export const White: LogStyle
}
