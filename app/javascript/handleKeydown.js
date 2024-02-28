function handleKeydown(){
	const commandForm = document.querySelector('#terminal-command');
	document.addEventListener('keydown', function(e){
		if(e.ctrlKey && e.key === "c"){
			terminal.initCommandForm();
		}

		if(e.key === "Enter" && !commandForm.classList.contains("hidden")){
			handleCommandForm(commandForm.value);
		}
	});
}
