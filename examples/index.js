/**
 * Loads all examples.
 * NPM Command : 'node lib/examples'
 */
;['debug', 'data'].forEach(e => {
	require('./' + e)
})
