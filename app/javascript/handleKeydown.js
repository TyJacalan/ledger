function handleKeydown(e){
	const commandForm = document.querySelector('#terminal-command');

	if(e.ctrlKey && e.key === "c"){
		console.log("running");
		initCommandForm();
	}

	if(e.key === "Enter" && !commandForm.classList.contains("hidden")){
		e.preventDefault();
		handleCommandForm(commandForm.value);
	}

	if(e.key === "Enter" && App.dueDateListContainer.classList.contains("focused")){
		handleTaskFilter(App.dueDateListContainer, "due_date");
	}

	if (e.ctrlKey && e.key === 'j' || e.ctrlKey && e.key === 'k' ) {
		handleNavigateBoxes(e);
	}
}
