/**
 * Loads all examples.
 * NPM Command : `node examples/`
 */
;['debug', 'data', 'error', 'warn', 'important', 'info', 'success', 'block', 'chuckle', 'custom', 'crash'].forEach(e =>
	require('./' + e)
)
