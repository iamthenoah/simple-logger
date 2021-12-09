/**
 * Loads all examples.
 * NPM Command : 'node lib/examples'
 */
;['debug', 'data', 'error', 'warn', 'important', 'info', 'success', 'block', 'chuckle', 'custom'].forEach(e => {
	require('./' + e)
})
