const categoryFormInputs = document.querySelectorAll('.terminal-category-input');
const taskFormInputs = document.querySelectorAll('.terminal-task-input');
const commandForm = document.querySelector('#terminal-command');
const terminalHelper = document.querySelector('#terminal-helper');
const terminalUi = [categoryFormInputs, taskFormInputs, commandForm, terminalHelper];

function initCommandForm() {
	initUi(commandForm);
};

function initCategoryForm() {
	initUi(categoryFormInputs[0]);
};

function initTaskForm() {
	initUi(taskFormInputs[0]);
};

function initHelper() {
    commandForm.classList.add("hidden");
    const categoryFormInputsVisible = categoryFormInputs.some(input => !input.classList.contains("hidden"));
    const taskFormInputsVisible = taskFormInputs.some(input => !input.classList.contains("hidden"));

    if (!categoryFormInputsVisible || !taskFormInputsVisible) {
        terminalHelper.classList.add("hidden");
    } else {
        terminalHelper.classList.remove("hidden");
    }
};

function hideUi(ui) {
	if (ui && ui.forEach) {
		ui.forEach(el => el.classList.add("hidden"));
	} else {
		ui.classList.add("hidden");
	}
};

function initUi(formElement) {
	// hide all interfaces
	terminalUi.forEach(ui => hideUi(ui));

	// unhide and focus current interface and add events
	formElement.classList.remove("hidden");
	formElement.focus();
	formElement.addEventListener('blur', () => {
		hideUi(formElement);
		initHelper();
	});
};

function processTaskForm(taskFormInputs) {
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
					//reset event handlers
					App.removeEventHandlers();
					App.initializeEventHandlers();
				}
			}
		});
	});
}

function handleCommandForm(command) {
	const activeEl = document.querySelector(".active");

	switch (command) {
		case ':C':
			initUi(categoryFormInputs[0]);
			break;
		case ':T':
			initUi(taskFormInputs[0]);
			processTaskForm(taskFormInputs);
			break;
		case ':E':
			activeEl.dataset.categoryId ? handleCategoryEdit() : handleTaskEdit();

			initHelper();
			break;
		case ':D':
			activeEl.dataset.categoryId ? handleCategoryDelete() : handleTaskDelete();
			
			initHelper();
			break;
		case ':X':
			handleLogOut();
			break;
		default:
			initHelper();
			break;
	}
}

