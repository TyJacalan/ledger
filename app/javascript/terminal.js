function initCommandForm() {
	initUi(App.commandForm);
};

function initCategoryForm() {
	initUi(App.categoryFormInputs[0]);
};

function initTaskForm() {
	initUi(App.taskFormInputs[0]);
};

function initHelper() {
    App.commandForm.classList.add("hidden");
    const categoryFormInputsVisible = Array.from(App.categoryFormInputs).some(input => !input.classList.contains("hidden"));
    const taskFormInputsVisible = Array.from(App.taskFormInputs).some(input => !input.classList.contains("hidden"));

    if (!categoryFormInputsVisible || !taskFormInputsVisible) {
        App.terminalHelper.classList.add("hidden");
    } else {
        App.terminalHelper.classList.remove("hidden");
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
	App.terminalUi.forEach(ui => hideUi(ui));

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
			initUi(App.categoryFormInputs[0]);
			break;
		case ':T':
			initUi(App.taskFormInputs[0]);
			processTaskForm(App.taskFormInputs);
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

