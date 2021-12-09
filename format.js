/**
 * Unflattens input `JSON` object.
 * @param data Flat object.
 * @returns Structured object.
 */
export const flatten = (data, record) => {
	Object.entries(data).forEach(entry => {
		const key = entry[0]
		const value = entry[1]

		if (typeof value === 'object' && !Array.isArray(value)) {
			Object.assign(record, flatten(value, record))
		} else {
			record[key] = value
		}
	})

	return record
}
