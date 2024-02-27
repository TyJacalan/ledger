document.addEventListener('DOMContentLoaded', function() {
	setupListNavigation('task-list-container', 'ul');
	setupListNavigation('category-list-container', 'ul');
});

function setupListNavigation(containerId, listTagName) {
	const container = document.getElementById(containerId);
	const list = container.querySelector(listTagName);
	let focusedIndex = -1;
	let previousItem = null;

	container.addEventListener('keydown', function(e) {
		if ((e.key === 'ArrowUp' || e.key === "ArrowLeft") && focusedIndex > 0) {
			e.preventDefault();
			updateFocus(-1);
		} else if ((e.key === 'ArrowDown' || e.key === "ArrowRight") && focusedIndex < list.children.length - 1) {
			e.preventDefault();
			updateFocus(1);
		}
	});

	function updateFocus(change) {
		if (previousItem) {
			previousItem.classList.remove('active');
		}
		focusedIndex += change;
		const listItem = list.children[focusedIndex];
		listItem.classList.add('active');
		previousItem = listItem;
	}
}



