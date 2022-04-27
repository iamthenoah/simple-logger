export namespace Console {
	/**
	 * Available log types.
	 */
	type LogType = 'log' | 'debug' | 'info' | 'data' | 'warn' | 'error' | 'trace' | 'group'

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
		 * @type {LogType[]}
		 * @default ['debug', 'data', 'log']
		 */
		excludeWhenNoVerbose?: LogType[] | string[]

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
	export interface Logger {
		Logger: Console.LoggerConstructorOptions
		log(...info: any[]): void
		debug(...info: any[]): void
		info(...info: any[]): void
		data(...info: any[]): void
		warn(...info: any[]): void
		error(...info: any[]): void
		trace(...info: any[]): void
		group(name: LogType | string, ...info: any[]): void
		start(...info: any[]): void
		crash(reason: any): void
		chuckle(): void
		clear(): void
	}
}

export namespace Log {
	/**
	 * Log element for logger to process.
	 */
	export class Element {
		constructor(tag: string, style: Log.Style, prefix: string, prepend: string, append: string)
		static create(tag: string, style: Log.Style): Element
	}

	/**
	 * Styling object for the logger to process via `processLog`.
	 */
	export class Style {
		constructor(logText: string, logBackground: string, tagText: string, tagBackground: string)
		colorLog(...info: any[]): string[]
		colorTag(...info: any[]): string[]
		static bold(...info: any[]): string[]
		static create(logText: string, tagBackground: string): Style
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
}

/**
 * Default `Logger` object.
 */
export const Logger: Console.Logger

/**
 * Creates an instance of a Logger with given options.
 *
 * @param {Console.LoggerConstructorOptions?} config Logger config options.
 * @param {Record<string, Log.Element>} extraLogElements Additional log elements to add to logger.
 * @returns {Console.Logger}
 */
export function createLogger(
	options?: Console.LoggerConstructorOptions,
	extraLogElements?: Record<Console.LogType | string, Log.Element>
): Console.Logger
