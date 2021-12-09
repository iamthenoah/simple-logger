import Log from './Log'

export default interface Logger {
    log(...info: unknown): void
    error(...info: unknown): void
    warn(...info: unknown): void
    debug(...info: unknown): void
    success(...info: unknown): void
    start(...info: unknown): void
    crash(...info: unknown): void
    block(...info: unknown): Log
    space(...info: unknown): Log
}