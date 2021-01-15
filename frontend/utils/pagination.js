export const itemPagination = (items) =>
	({
		 page,
		 limit,
		 sort = null,
		 query = null,
		 getTotal = false
	}) => {
	if (sort) {
		const { element, direction } = sort;
		items = items.sort((a, b) =>
			a[element] > b[element]
				? direction
				: ((a[element] < b[element]) ? direction * -1 : 0)
		)
	}

	if(query) {
		const { fields, text } = query;

		items = items.filter((item) => {
			for(const field of fields) {
				if (item[field] !== null && item[field].toLowerCase().startsWith(text)) {
					return item;
				}
			}
		})
	}

	if(limit === -1) return items;

	const endOn = items.length < page * limit
		? items.length
		: page * limit;

	const elements = [];

	for (let i = 0; i < endOn; i++) {
		elements.push(items[i])
	}

	return getTotal
		? { elements, total: items.length }
		: elements;
}
