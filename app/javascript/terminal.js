document.addEventListener('keydown', function(event) {
    const categoryForm = document.querySelector('#terminal-category');
    const taskForm = document.querySelector('#terminal-task');
    const terminalHelper = document.querySelector('#terminal-helper');


    function initTerminal(formElement){
        event.preventDefault();

        console.log(terminalHelper.classList.contains('hidden'));

        const terminalUi = [categoryForm, taskForm, terminalHelper];
        terminalUi.forEach(ui => ui.classList.add('hidden'));

        formElement.classList.remove('hidden');
        formElement.focus();

        formElement.addEventListener('blur', function(){
                showTerminalHelper()
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

	taskForm.addEventListener("keydown", function(event) {
		if(event.key === "Enter"){
			# prevent the form from submitting
			event.preventDefault();
		}
	}

    // Create a new category
    if (event.ctrlKey && event.altKey && event.key === 'c') {
        initTerminal(categoryForm);
    }

    // Create a new task
    if (event.ctrlKey && event.altKey && event.key === 't'){
        initTerminal(taskForm);
    }
});
