function handleKeydown(){
	const commandForm = document.querySelector('#terminal-command');
	document.addEventListener('keydown', function(e){
		if(e.ctrlKey && e.key === "c"){
			initCommandForm();
		}

		if(e.key === "Enter" && !commandForm.classList.contains("hidden")){
			handleCommandForm(commandForm.value);
		}

		if(e.key === "Enter" && App.dueDateListContainer.classList.contains("focused")){
			handleTaskFilter(App.dueDateListContainer, "due_date");
		}

		if (e.ctrlKey && e.key === 'j' || e.ctrlKey && e.key === 'k' ) {
			handleNavigateBoxes(e);
		}
	});
}
