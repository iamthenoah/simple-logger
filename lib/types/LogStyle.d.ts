export default interface LogStyle {
    colorForeground(line: string): string
    colorBackground(line: string): string
}