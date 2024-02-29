function handleEdit(e){
	const categoryItem = document.querySelector("#category-list > li.active");
	const userId = categoryItem.dataset.userId;
	const categoryId = categoryItem.dataset.categoryId;

	App.removeEventHandlers();

	fetch(`/users/${userId}/categories/${categoryId}/edit`)
		.then(response => response.text())
		.then(data => {
			categoryItem.innerHTML = data;
			const editForm = document.querySelector("#category-edit-form");

			//Reinitialize navigation
			App.initializeEventHandlers();
		})
		.catch(error => console.error('Error fetching category edit form:', error));
};
