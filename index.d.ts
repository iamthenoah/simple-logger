export namespace Console {
	/**
	 * Available log types.
	 */
	type LogType = 'log' | 'debug' | 'info' | 'data' | 'warn' | 'error' | 'trace' | 'success' | 'important'

	/**
	 * Logging verbose types.
	 *
	 * `true` => logs everything
	 * `false` => logs everything except all specified in the `excludeWhenNoVerbose` logger option.
	 */
	export type Verbose = boolean

	/**
	 * Default logger config options.
	 */
	export interface LoggerConstructorOptions {
		/**
		 * `verbose`
		 *
		 * Dictates what the logger can display.
		 *
		 * @type {Verbose}
		 * @default debug
		 */
		verbose?: Verbose

		/**
		 * `isDevelopment`
		 *
		 * Dictates whether `error` logs with errors displays the stacktrace.
		 *
		 * @type {boolean}
		 * @default process.env.NODE_ENV
		 */
		isDevelopment?: boolean

		/**
		 * `minTagWidth`
		 *
		 * Defines minmum tag label width.
		 * Setting it to '-1' will default to the tags width.
		 *
		 * @type {boolean}
		 * @default -1
		 */
		minTagWidth?: number

		/**
		 * `excludeWhenNotVerbose`
		 *
		 * `LogType`s to exclude while `verbose` is set to `false`.
		 * Also works with custom log types.
		 *
		 * @type {Verbose[]}
		 * @default ['debug', 'data', 'log']
		 */
		excludeWhenNoVerbose?: Verbose[] | string[]

		/**
		 * `ignoreErrors`
		 *
		 * Whether the logger handles `errors` events.
		 *
		 * @type {boolean}
		 * @default false
		 */
		ignoreErrors?: boolean

		/**
		 * `ignoreWarnings
		 *
		 * Whether the logger handles `warning` events.
		 *
		 * @type {boolean}
		 * @default process.env.NODE_ENV is 'production'
		 */
		ignoreWarnings?: boolean
	}

	/**
	 * Logger object. All available log types.
	 */
	export interface Logger extends Console {
		Logger: Console.LoggerConstructorOptions
		log(...info: any[]): void
		debug(...info: any[]): void
		warn(...info: any[]): void
		error(...info: any[]): void
		info(...info: any[]): void
		imporant(...info: any[]): void
		success(...info: any[]): void
		data(...info: any[]): void
		group(name: LogType, ...info: any[]): void
		space(name: LogType, ...info: any[]): void
		chuckle(): void
		start(...info: any[]): void
		crash(reason: any): void
		clear(): void
	}
}

export namespace Log {
	/**
	 * Log element for logger to process.
	 */
	export class Element {
		constructor(tag: any, style: any, prefix: any, prepend: any, append: any)
		static create(tag: any, style: any): Element
	}

	/**
	 * Styling object for the logger to process via `processLog`.
	 */
	export class Style {
		constructor(logText: any, logBackground: any, tagText: any, tagBackground: any)
		colorLog(...info: any[]): string[]
		colorTag(...info: any[]): string[]
		static bold(...info: any[]): string[]
		static create(logText: any, tagBackground: any): Style
	}

	/**
	 * Special style for `debug` logs.
	 *
	 * @type {Log.Style}
	 */
	export const Grey: Log.Style

	/**
	 * `Red` log styling.
	 *
	 * @type {Log.Style}
	 */
	export const Red: Log.Style

	/**
	 * `Blue` log styling.
	 *
	 * @type {Log.Style}
	 */
	export const Blue: Log.Style

	/**
	 * `Green` log styling.
	 *
	 * @type {Log.Style}
	 */
	export const Green: Log.Style

	/**
	 * `Yellow` log styling.
	 *
	 * @type {Log.Style}
	 */
	export const Yellow: Log.Style

	/**
	 * `Magenta` log styling.
	 *
	 * @type {Log.Style}
	 */
	export const Magenta: Log.Style

	/**
	 * `Cyan` log styling.
	 *
	 * @type {Log.Style}
	 */
	export const Cyan: Log.Style

	/**
	 * `White` log styling.
	 *
	 * @type {Log.Style}
	 */
	export const White: Log.Style

	/**
	 * `Data` log element for 'data' logging.
	 *
	 * @type {Log.Element}
	 */
	export const Data: Log.Element

	/**
	 * `Log` log element for 'log' logging.
	 *
	 * @type {Log.Element}
	 */
	export const Log: Log.Element

	/**
	 * `Info` log element for 'info' logging.
	 *
	 * @type {Log.Element}
	 */
	export const Info: Log.Element

	/**
	 * `Debug` log element for 'debug' logging.
	 *
	 * @type {Log.Element}
	 */
	export const Debug: Log.Element

	/**
	 * `Warn` log element for 'warn' logging.
	 *
	 * @type {Log.Element}
	 */
	export const Warn: Log.Element

	/**
	 * `Error` log element for 'error' logging.
	 *
	 * @type {Log.Element}
	 */
	export const Error: Log.Element

	/**
	 * `Trace` log element for 'trace' logging.
	 *
	 * @type {Log.Element}
	 */
	export const Trace: Log.Element

	/**
	 * `Success` log element for 'success' logging.
	 *
	 * @type {Log.Element}
	 */
	export const Success: Log.Element

	/**
	 * `Important` log element for 'important' logging.
	 *
	 * @type {Log.Element}
	 */
	export const Important: Log.Element
}

/**
 * Default `Logger` object.
 */
export const Logger: Console.Logger

/**
 * Creates an instance of a Logger with given options.
 *
 * @param {LoggerConstructorOptions?} config Logger config options.
 * @param {Record<string, Log.Element>} extraLogElements Additional log elements to add to logger.
 * @returns {Logger}
 */
export function createLogger(
	options?: LoggerConstructorOptions,
	extraLogElements: Record<string, Log.Element>
): Console.Logger
