import { flatten } from './Format'

export const Verbose = 'debug' | 'warnings' | 'errors'

const isDevelopment = process.env.NODE_ENV === 'development'

const CONSOLE_WIDTH = 70

export const white = info => '\x1b[37m' + info + '\x1b[0m'
export const red = info => '\x1b[31m' + info + '\x1b[0m'
export const green = info => '\x1b[32m' + info + '\x1b[0m'
export const yellow = info => '\x1b[33m' + info + '\x1b[0m'
export const blue = info => '\x1b[34m' + info + '\x1b[0m'
export const magenta = info => '\x1b[35m' + info + '\x1b[0m'
export const cyan = info => '\x1b[36m' + info + '\x1b[0m'

export const dimLabel = info => '\x1b[40m' + white(info) + '\x1b[0m'
export const redLabel = info => '\x1b[41m' + white(info) + '\x1b[0m'
export const greenLabel = info => '\x1b[42m' + white(info) + '\x1b[0m'
export const yellowLabel = info => '\x1b[43m' + white(info) + '\x1b[0m'
export const blueLabel = info => '\x1b[44m' + white(info) + '\x1b[0m'
export const magentaLabel = info => '\x1b[45m' + white(info) + '\x1b[0m'
export const cyanLabel = info => '\x1b[46m' + white(info) + '\x1b[0m'

export const bold = info => '\x1b[1m' + info + '\x1b[0m'
export const dim = info => '\x1b[2m' + info + '\x1b[0m'
export const center = info => ' '.repeat((CONSOLE_WIDTH - info.length) / 2 - 1) + info

export default class Logger {
	static log(info = null) {
		console.log(`[${new Date().toLocaleString()}]`, dim('::'), info ?? '')
	}

	static debug(...info) {
		if (process.env.VERBOSE === 'debug') Logger.label('DEBUG', dimLabel, dim(info))
	}

	static info(...info) {
		Logger.label('INFO', cyanLabel, cyan(info))
	}

	static success(info = null) {
		Logger.label('SUCCESS', greenLabel, green(info ? '=> ' + info : ''))
	}

	static warn(...info) {
		if (process.env.VERBOSE !== 'debug' && process.env.VERBOSE !== 'errors') {
			Logger.label('WARNING', yellowLabel, yellow(info))
		}
	}

	static error(...info) {
		Logger.label('ERROR', redLabel, red(info instanceof Error ? info.message : info))
		if (isDevelopment && info instanceof Error) {
			const s = info.stack?.split('\n')
			s?.forEach(l => Logger.log(red(l)))
		}
	}

	static important(...info) {
		Logger.space(() => Logger.label('IMPORTANT', magentaLabel, magenta(info)))
	}

	static label(label, highlight = dimLabel, ...lines) {
		lines.forEach(l => Logger.log(bold(highlight(' ' + label.toUpperCase() + ' ')) + ' ' + l))
	}

	static data(obj) {
		if (process.env.VERBOSE === 'debug') {
			const arr = flatten(obj)
			Object.keys(arr).forEach(k => {
				const s = k + ' : ' + arr[k]
				Logger.label('DATA', blueLabel, yellow(s))
			})
		}
	}

	static block(lines) {
		// Logger.log(label + ' ' + '-'.repeat(60 - label.length - 2))
		Logger.log('-'.repeat(CONSOLE_WIDTH))
		lines()
		Logger.log('-'.repeat(CONSOLE_WIDTH))
	}

	static space(lines) {
		Logger.log()
		lines()
		Logger.log()
	}

	static start(...messages) {
		console.clear()
		Logger.block(() => messages.forEach(Logger.log))
	}

	static crash(fatal, reason = null) {
		Logger.space(() => Logger.error('Application crashed...'))
		if (reason) {
			Logger.block(() => {
				Logger.log(bold(red('Caused by:')))
				Logger.error(reason)
			})
		}
		if (fatal) Logger.space(() => Logger.debug('Now closing the application...'))
	}

	static chuckle() {
		if (process.env.VERBOSE === 'debug') {
			const jokes = [
				['Why did the scarecrow win an award?', 'He was outstanding in his field.'],
				["February can't March.", 'But April May!'],
				["Why don't crabs ever give to charity?", "Because they're shellfish."],
				['Why did the carpenter leave the lumber store?', 'Because he got bored.'],
				['Why did the snake go to the doctor?', 'Because he had a frog in his throat.'],
				['Why did the ghost buy a box of bandages?', 'Because he had so many BOO BOOs.'],
				['If I asked you to choose your favorite feature, would you...', '...pick your nose?'],
				['Why did the astronaut move to the suburbs?', 'He wanted more space.'],
				['Why did the pizza cutter get a speeding ticket?', 'Because he was rounding the corner too fast.'],
				["What's big and hairy and wears a bow tie?", 'Bigfoot at a fancy party.'],
				['Did you hear the one about the Ballerina Debate Team?', 'They always stay on point.'],
				['Have you heard about the sale at the Optimist Store?', "Everything's 50% on."],
				['Why do optimists have to wear sunglasses?', "Because they're always looking on the bright side."],
				['Where do fancy cats go to the bathroom?', 'The glitter box.'],
				['Why did the golf course hire the dermatologist?', 'It needed to have some moles removed.'],
				["Did you hear about the world's greatest watch thief?", 'He stole all the time.'],
				['Why was the basketball court all wet?', 'People kept dribbling all over it.'],
				['How do you make a bandstand?', 'Take away all of the chairs.'],
				["What do you call cheese that's not yours?", 'Nacho cheese.'],
				['What do you call a fake noodle?', 'An impasta!'],
				['What kind of tree fits in your hand?', 'A palm tree.'],
				['How do trees get on the internet?', 'They log on.'],
				['Did you hear about the new book on anti-gravity?', "It's impossible to put down."],
				['Hear about the guy that got fired from the calendar factory?', 'He took too many days off.'],
				['Did you hear about the circus fire?', 'It was in tents.'],
				['Do you know what the loudest pet is?', 'A trumpet.'],
				['What did the buffalo say to his son when he dropped him off at school?', 'Bison'],
				['What did the ocean say to the shore?', 'Nothing. It just waved.'],
				['What did the beaver say to the tree?', "It's been nice gnawing you."],
				['Hear about the lazy kangaroo?', 'He was a real pouch potato.'],
				['What do you call a man with a rubber toe?', 'Roberto.'],
				['Why do you never see elephants hiding in trees?', "Because they're really good at it."],
				["I couldn't figure out the seat belts in my new car...", '...but then it clicked.'],
				["Have you heard the pizza joke that's going around the internet?", "It's a little cheesy."],
				["What's red and smells like paint?", 'Red paint.'],
				['Did you hear that they invented a new type broom?', "It's sweeping the nation."],
				['What is brown and sticky?', 'A stick.'],
				["What's more amazing than a talking dog?", 'A spelling bee.'],
				['What do you call a pony with a sore throat?', 'A little horse.'],
				['I used to really hate facial hair.', 'Then one day, it grew on me.'],
				['How many apples grow on an apple tree?', 'All of them.'],
				['Do you know the name of the boy wizard that loved to play golf?', 'Harry Putter.'],
				['Why do bees hum?', "Because they don't know the words."]
			]
			const joke = jokes[Math.floor(Math.random() * jokes.length - 1)]
			Logger.debug(joke[0])
			Logger.debug(joke[1])
		}
	}
}
