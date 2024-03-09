function handleTaskEdit(e){
    const taskItem = document.querySelector("#task-list > li.prevItem");
    const userId = taskItem.dataset.userId;
    const taskId = taskItem.dataset.taskId;

    fetch(`/users/${userId}/tasks/${taskId}/edit`)
        .then(response => response.text())
        .then(data => {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = data;
            const formElement = tempElement.querySelector('form');

            // Replace the current task item with the form
            taskItem.parentNode.replaceChild(formElement, taskItem);

            const editForm = document.querySelector("#task-edit-form");

            App.removeEventHandlers();

            const firstInput = editForm.querySelectorAll("input")[2];
            if(firstInput){
                firstInput.focus();
            }

            editForm.addEventListener("submit", function(e) {
                //Reinitialize navigation
                App.initializeEventHandlers();
            });
        })
        .catch(error => console.error('Error fetching task edit form:', error));
}
