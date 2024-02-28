document.addEventListener('keydown', function(event) {
	const categoryFormInputs = document.querySelectorAll('.terminal-category-input');
	const taskFormInputs = document.querySelectorAll('.terminal-task-input');
	const commandForm = document.querySelector('#terminal-command');
	const terminalHelper = document.querySelector('#terminal-helper');

	const terminalUi = [categoryFormInputs, taskFormInputs, commandForm, terminalHelper];

	function initTerminal(formElement){
		event.preventDefault();

		terminalUi.forEach(ui => hideUi(ui));

		formElement.classList.remove('hidden');
		formElement.focus();

		formElement.addEventListener('blur', function(){
			hideForm(formElement)
			showTerminalHelper();
		});
	}

	function hideUi(ui){
		if(ui && ui.forEach){
			ui.forEach(el => el.classList.add('hidden'));
		} else {
			ui.classList.add('hidden')
		};
	}

	function showTerminalHelper() {
		commandForm.classList.add("hidden");
		
		if (!categoryFormInputs[0].classList.contains('hidden') || !taskFormInputs[0].classList.contains('hidden')) {
			terminalHelper.classList.add('hidden');
		} else {
			terminalHelper.classList.remove('hidden');
		}
	}


	function hideForm(formElement) {
		formElement.classList.add('hidden');
	}

	taskFormInputs.forEach(function(input, index) {
		input.addEventListener("keydown", function(event) {
			if (event.key === "Enter") {
				input.classList.add("hidden");

				// Show the next input, or submit the form if it's the last input
				if (index < taskFormInputs.length - 1) {
					event.preventDefault();
					taskFormInputs[index + 1].classList.remove("hidden");
					taskFormInputs[index + 1].focus();
				} else {
					console.log("submitting");
					console.log(input.id);
				}
			}
		});
	});

	commandForm.addEventListener("keydown", function(e){
		if(e.key === "Enter"){
			e.preventDefault();
			const command = commandForm.value;
			
			switch(command){
				case ':C':
					initTerminal(categoryFormInputs[0]);
					break;
				case ':T':
					initTerminal(taskFormInputs[0]);
					break;
				case ':E':
					handleEdit();
					showTerminalHelper();
					break;
				case ':D':
					handleDelete();
					showTerminalHelper();
					break;
				default:
					commandForm.value = "No command found!";
					showTerminalHelper();
					break;
			}

			commandForm.value = "";
		}
	});

	if(event.ctrlKey && event.key === "c"){
		initTerminal(commandForm);
	}

});
