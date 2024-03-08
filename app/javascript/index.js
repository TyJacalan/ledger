const App = {
	taskListContainer: null,
	categoryListContainer: null,
	dueDateListContainer: null,
	categoryFormInputs: null,
	taskFormInputs: null,
	commandForm: null,
	terminalHelper: null,
	terminalUi: null,

	initializeEventHandlers: function() {
		this.taskListKeyDownHandler = this.handleTaskListKeyDown.bind(this);
		this.categoryListKeyDownHandler = this.handleCategoryListKeyDown.bind(this);
		this.dueDateListKeyDownHandler = this.handleDueDateListKeyDown.bind(this);

		this.taskListContainer.addEventListener("keydown", this.taskListKeyDownHandler);
		this.categoryListContainer.addEventListener("keydown", this.categoryListKeyDownHandler);
		this.dueDateListContainer.addEventListener("keydown", this.dueDateListKeyDownHandler);

		handleFocus();
		
		handleKeydown();
	},

	removeEventHandlers: function() {
		this.taskListContainer.removeEventListener("keydown", this.taskListKeyDownHandler);
		this.categoryListContainer.removeEventListener("keydown", this.categoryListKeyDownHandler);
		this.dueDateListContainer.removeEventListener("keydown", this.dueDateListKeyDownHandler);

		// Reset event handler references
		this.taskListKeyDownHandler = null;
		this.categoryListKeyDownHandler = null;
		this.dueDateListKeyDownHandler = null;
	},

	handleTaskListKeyDown: function(e) {
		handleNavigate(this.taskListContainer, 'ul', e);
	},

	handleCategoryListKeyDown: function(e) {
		handleNavigate(this.categoryListContainer, 'ul', e);
	},

	handleDueDateListKeyDown: function(e) {
		handleNavigate(this.dueDateListContainer, 'ul', e);
	}
}

document.addEventListener('DOMContentLoaded', function(){
	App.taskListContainer = document.querySelector('#task-list-container');
	App.categoryListContainer = document.querySelector('#category-list-container');
	App.dueDateListContainer = document.querySelector('#due-date-list-container');
	App.initializeEventHandlers();

	App.categoryFormInputs = document.querySelectorAll('.terminal-category-input');
	App.taskFormInputs = document.querySelectorAll('.terminal-task-input');
	App.commandForm = document.querySelector('#terminal-command');
	App.terminalHelper = document.querySelector('#terminal-helper');
	App.terminalUi = [App.categoryFormInputs, App.taskFormInputs, App.commandForm, App.terminalHelper];
});
