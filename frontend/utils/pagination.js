export const itemPagination = (items) => (page, limit, sort = null) => {
	if (sort) {
		const { element, direction } = sort;
		items = items.sort((a, b) =>
			a[element] > b[element]
				? direction
				: ((a[element] < b[element]) ? direction * -1 : 0)
		)
	}

	if(limit === -1) return items;

	const endOn = items.length < page * limit
		? items.length
		: page * limit;

	const elements = [];

	for (let i = 0; i < endOn; i++) {
		elements.push(items[i])
	}

	return elements;
}
