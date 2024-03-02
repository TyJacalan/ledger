function handleTaskEdit(e){
	const taskItem = document.querySelector("#task-list > li.active");
	const userId = taskItem.dataset.userId;
	const taskId = taskItem.dataset.taskId;


	fetch(`/users/${userId}/tasks/${taskId}/edit`)
		.then(response => response.text())
		.then(data => {
			taskItem.innerHTML = data;
			const editForm = document.querySelector("#task-edit-form");

			App.removeEventHandlers();

			const firstInput = editForm.querySelectorAll("input")[2];
			if(firstInptu){
				firstInput.focus();
			}

			editForm.addEventListener("submit", function(e) {
				e.preventDefault();

				//Reinitialize navigation
				App.initializeEventHandlers();
			});
		})
		.catch(error => console.error('Error fetching task edit form:', error));
}
