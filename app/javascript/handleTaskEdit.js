function handleTaskEdit(e){
	const taskItem = document.querySelector("#task-list > li.active");
	const userId = taskItem.dataset.userId;
	const taskId = taskItem.dataset.taskId;

	//App.removeEventHandlers();

	fetch(`/users/${userId}/tasks/${taskId}/edit`)
		.then(response => response.text())
		.then(data => {
			taskItem.innerHTML = data;
			const editForm = document.querySelector("#task-edit-form");

			//Reinitialize navigation
			App.initializeEventHandlers();
		})
		.catch(error => console.error('Error fetching task edit form:', error));
}
