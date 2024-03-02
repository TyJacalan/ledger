const App = {
	taskListContainer: null,
	categoryListContainer: null,

	initializeEventHandlers: function() {
		this.taskListKeyDownHandler = this.handleTaskListKeyDown.bind(this);
		this.categoryListKeyDownHandler = this.handleCategoryListKeyDown.bind(this);

		this.taskListContainer.addEventListener("keydown", this.taskListKeyDownHandler);
		this.categoryListContainer.addEventListener("keydown", this.categoryListKeyDownHandler);
		
		handleFocus();
		
		handleKeydown();
	},

	removeEventHandlers: function() {
		this.taskListContainer.removeEventListener("keydown", this.taskListKeyDownHandler);
		this.categoryListContainer.removeEventListener("keydown", this.categoryListKeyDownHandler);

		// Reset event handler references
		this.taskListKeyDownHandler = null;
		this.categoryListKeyDownHandler = null;
	},

	handleTaskListKeyDown: function(e) {
		Navigator.handleNavigate(this.taskListContainer, 'ul', e);
	},

	handleCategoryListKeyDown: function(e) {
		Navigator.handleNavigate(this.categoryListContainer, 'ul', e);
	}
}

document.addEventListener('DOMContentLoaded', function(){
	App.taskListContainer = document.querySelector('#task-list-container');
	App.categoryListContainer = document.querySelector('#category-list-container');
	App.initializeEventHandlers();
});
