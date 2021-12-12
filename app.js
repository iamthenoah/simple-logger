const { createLogger } = require('./index')
const Log = require('./lib/log')

const l = createLogger({ minTagWidth: 4 }, { mabite: Log.Info })

l.clear()
l.data(
	{ edewddew: 'ewdwd' },
	{ weewfew: 'wefwefew' },
	'wffwefef',
	{
		squadName: 'Super hero squad',
		homeTown: 'Metro City',
		formed: 2016,
		secretBase: 'Super tower',
		active: true
	},
	{
		name: 'Molecule Man',
		age: 29,
		secretIdentity: 'Dan Jukes',
		powers: ['Radiation resistance', 'Turning tiny', 'Radiation blast']
	},
	{
		name: 'Madame Uppercut',
		age: 39,
		secretIdentity: 'Jane Wilson',
		powers: ['Million tonne punch', 'Damage resistance', 'Superhuman reflexes']
	},
	{
		name: 'Eternal Flame',
		age: 1000000,
		secretIdentity: 'Unknown',
		powers: ['Immortality', 'Heat Immunity', 'Inferno', 'Teleportation', 'Interdimensional travel']
	}
)
