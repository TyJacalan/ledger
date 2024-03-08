function handleCategoryDelete() {
	const categoryItem = document.querySelector("#category-list > li.active");
	const userId = categoryItem.dataset.userId;
	const categoryId = categoryItem.dataset.categoryId;

	console.log(categoryItem);

	const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

	fetch(`/users/${userId}/categories/${categoryId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRF-Token': csrfToken
		}
	})
		.then(response => response.text())
		.then(data => {
			categoryItem.remove();
		})
		.catch(error => console.error('Error deleting category:', error));
}
