function handleTaskDelete() {
	const taskItem = document.querySelector("#task-list > li.active");
	const userId = taskItem.dataset.userId;
	const taskId = taskItem.dataset.taskId;

	const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

	fetch(`/users/${userId}/task/${taskId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRF-Token': csrfToken
		}
	})
		.then(response => response.text())
		.then(data => {
			console.log('Task deleted successfully:', data);
			taskItem.remove();
		})
		.catch(error => console.error('Error deleting task:', error));
}
