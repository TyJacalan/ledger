const terminal = {
	categoryFormInputs: document.querySelectorAll('.terminal-category-input'),
	taskFormInputs: document.querySelectorAll('.terminal-task-input'),
	commandForm: document.querySelector('#terminal-command'),
	terminalHelper: document.querySelector('#terminal-helper'),
	terminalUi: [],

	initCommandForm() {
		this.initUi(this.commandForm);
	},

	initCategoryForm() {
		this.initUi(this.categoryFormInputs[0]);
	},

	initTaskForm() {
		this.initUi(this.taskFormInputs[0]);
	},

	initHelper() {
		this.commandForm.classList.add("hidden");

		if (!this.categoryFormInputs[0].classList.contains("hidden") || !this.taskFormInputs[0].classList.contains("hidden")) {
			this.terminalHelper.classList.add("hidden");
		} else {
			this.terminalHelper.classList.remove("hidden");
		}
	},

	hideUi(ui) {
		if (ui && ui.forEach) {
			ui.forEach(el => el.classList.add("hidden"));
		} else {
			ui.classList.add("hidden");
		}
	},

	initUi(formElement) {
		event.preventDefault();

		// hide all interfaces
		this.terminalUi.forEach(ui => this.hideUi(ui));

		// unhide and focus current interface and add events
		formElement.classList.remove("hidden");
		formElement.focus();
		formElement.addEventListener('blur', () => {
			this.hideUi(formElement);
			this.initHelper();
		});
	}
};

terminal.terminalUi = [terminal.categoryFormInputs, terminal.taskFormInputs, terminal.commandForm, terminal.terminalHelper];

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
					console.log("submitting");
					console.log(input.id);
				}
			}
		});
	});
}

function handleCommandForm(command) {
	const activeEl = document.querySelector(".active");

	switch (command) {
		case ':C':
			terminal.initUi(terminal.categoryFormInputs[0]);
			break;
		case ':T':
			terminal.initUi(terminal.taskFormInputs[0]);
			processTaskForm(terminal.taskFormInputs);
			break;
		case ':E':
			activeEl.dataset.categoryId ? handleCategoryEdit() : handleTaskEdit();
			
			terminal.initHelper();
			break;
		case ':D':
			activeEl.dataset.categoryId ? handleCategoryDelete() : handleTaskDelete();
			
			terminal.initHelper();
			break;
		default:
			terminal.initHelper();
			break;
	}
}

