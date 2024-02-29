const App = {
	taskListContainer: null,
	categoryListContainer: null,

	initializeEventHandlers: function() {
		this.taskListContainer.addEventListener("keydown", this.handleTaskListKeyDown.bind(this));
		this.categoryListContainer.addEventListener("keydown", this.handleCategoryListKeyDown.bind(this));
		handleFocus();
		handleKeydown();
	},

	removeEventHandlers: function() {
		this.taskListContainer.removeEventListener("keydown", this.handleTaskListKeyDown.bind(this));
		this.categoryListContainer.removeEventListener("keydown", this.handleCategoryListKeyDown.bind(this));
		
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
