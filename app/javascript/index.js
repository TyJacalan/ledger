document.addEventListener('DOMContentLoaded', function() {
	document.addEventListener("keypress", function(e) {
		if(e.key === "Enter"){
			handleEdit();
		}
	});
	
	handleNavigate('task-list-container', 'ul');
	handleNavigate('category-list-container', 'ul');
	handleFocus();
});
