document.addEventListener('DOMContentLoaded', function() {
	function initializeEventHandlers(){
		handleNavigate('task-list-container', 'ul');
		handleNavigate('category-list-container', 'ul');
		handleFocus();
		handleKeydown();
	};

	initializeEventHandlers();
});
