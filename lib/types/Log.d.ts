import LogStyle from './LogStyle'

export default interface Log {
	info: unknown
    label: string
    style: LogStyle
}