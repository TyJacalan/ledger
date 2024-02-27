document.addEventListener('keydown', function(event) {
    const categoryForm = document.querySelector('#terminal-category');
    const taskForm = document.querySelectorAll('.terminal-task');
    const terminalHelper = document.querySelector('#terminal-helper');

    function initTerminal(formElement){
        event.preventDefault();

        const terminalUi = [categoryForm, terminalHelper];
        terminalUi.forEach(ui => ui.classList.add('hidden'));
	taskForm.forEach(input => input.classList.add('hidden'));

        formElement.classList.remove('hidden');
        formElement.focus();

        formElement.addEventListener('blur', function(){
		// showTerminalHelper()
                hideForm(formElement)
	}           
        );
    }

    function showTerminalHelper() {
        if (!categoryForm.classList.contains('hidden') || !taskForm.classList.contains('hidden')) {
            terminalHelper.classList.add('hidden');
        } else {
            terminalHelper.classList.remove('hidden');
        }
    }

    function hideForm(formElement) {
        formElement.classList.add('hidden');
    }

    taskForm.forEach(function(input, index) {
	input.addEventListener("keydown", function(event) {
		if (event.key === "Enter") {
			// prevent the form from submitting
			//event.preventDefault();
			// hide the current input
			input.classList.add("hidden");

			// Show the next input, or submit the form if it's the last input
			if (index < taskForm.length - 1) {
				event.preventDefault();
				taskForm[index + 1].classList.remove("hidden");
				taskForm[index + 1].focus();
			} else {
				console.log("submitting");
				console.log(input.id);
			}
		}
	});
    });

    // Create a new category
    if (event.ctrlKey && event.altKey && event.key === 'c') {
        initTerminal(categoryForm);
    }

    // Create a new task
    if (event.ctrlKey && event.altKey && event.key === 't'){
        initTerminal(taskForm[0]);
    }
});
