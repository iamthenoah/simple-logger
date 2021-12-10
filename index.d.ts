/**
 * Available log types.
 */
type LogType = 'debug' | 'warn' | 'error' | 'info' | 'important' | 'success' | 'data' | 'label' | 'chuckle'

/**
 * Logging verbose types.
 * `debug` => logs everything
 * `warning` => logs everything EXCEPT (`debug` and `data` logs)
 * `errors` => display everything EXCEPT (`debug`, `data` and `warning` logs)
 */
export type Verbose = 'debug' | 'warning' | 'error'

/**
 * Default logger config options.
 */
export type LoggerOptions = {
	/**
	 * `isDevelopment` (default: `process.env.NODE_ENV`)
	 * Dictates whether `error` logs with errors displays the stacktrace.
	 * @type {boolean}
	 */
	isDevelopment?: boolean

	/**
	 * `verbose` (default: `debug`)
	 * Dictates what the logger can display
	 * @type {Verbose}
	 */
	verbose?: Verbose

	/**
	 * `width` (default: `80`)
	 * Defines the horizontal boundaries of the console.
	 * @type {number}
	 */
	width?: number

	/**
	 * `handleUncaughtException` (default `false`)
	 * Whether the logger handles `uncaughtException` events.
	 * @type {boolean}
	 */
	handleUncaughtException?: boolean

	/**
	 * `handleUnhandledRejection` (default `false`)
	 * Whether the logger handles `unhandledRejection` events.
	 * @type {boolean}
	 */
	handleUnhandledRejection?: boolean

	/**
	 * `handleWarning` (default `false`)
	 * Whether the logger handles `warning` events.
	 * @type {boolean}
	 */
	handleWarning?: boolean
}

/**
 * Creates an instance of a Logger with given options.
 * @param {LoggerOptions?} config Logger config options.
 * @returns {Logger}
 */
export function createLogger(options?: LoggerOptions): Logger.Logger

export namespace Logger {
	/**
	 * Log type object for the logger to process via `processLog`.
	 */
	export type Log = {
		info: any
		label: string
		style: Style.LogStyle
	}

	/**
	 * Logger object. All available log types.
	 */
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
	/**
	 * Styling object for the logger to process via `processLog`.
	 */
	export class LogStyle {
		constructor(fg: string, bg: string)
		fg(...info: string[]): string
		bg(...info: string[]): string
	}

	/**
	 * Wraps input with the highlight escape sequence.
	 * @param {string} line input.
	 */
	export function bold(...line: string[]): string

	/**
	 * Special style for `debug` logs.
	 * @type {LogStyle}
	 */
	export const Debug: LogStyle

	/**
	 * Spectial style for `data` logs.
	 * @type {LogStyle}
	 */
	export const Data: LogStyle

	/**
	 * `Red` log styling.
	 * @type {LogStyle}
	 */
	export const Red: LogStyle

	/**
	 * `Green` log styling.
	 * @type {LogStyle}
	 */
	export const Green: LogStyle

	/**
	 * `Yellow` log styling.
	 * @type {LogStyle}
	 */
	export const Yellow: LogStyle

	/**
	 * `Blue` log styling.
	 * @type {LogStyle}
	 */
	export const Blue: LogStyle

	/**
	 * `Magenta` log styling.
	 * @type {LogStyle}
	 */
	export const Magenta: LogStyle

	/**
	 * `Cyan` log styling.
	 * @type {LogStyle}
	 */
	export const Cyan: LogStyle

	/**
	 * `White` log styling.
	 * @type {LogStyle}
	 */
	export const White: LogStyle
}
