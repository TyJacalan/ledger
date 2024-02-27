document.addEventListener('DOMContentLoaded', function() {
	setupListNavigation('task-list-container', 'ul');
});

document.addEventListener('DOMContentLoaded', function() {
	setupListNavigation('category-list-container', 'ul');
});

function setupListNavigation(containerId, listTagName) {
	const container = document.getElementById(containerId);
	const list = container.querySelector(listTagName);
	let focusedIndex = -1;
	let previousItem = null;

	container.addEventListener('keydown', function(e) {
		if (e.key === 'ArrowUp' || e.key === "ArrowLeft") {
			e.preventDefault();
			if (focusedIndex > 0) {
				// Remove class from previous item
				if (previousItem) {
					previousItem.classList.remove('active');
				}
				focusedIndex--;
				const listItem = list.children[focusedIndex];
				listItem.classList.add('active');

				previousItem = listItem;
			}
		} else if (e.key === 'ArrowDown' || e.key === "ArrowRight") {
			e.preventDefault();
			if (focusedIndex < list.children.length - 1) {
				// Remove class from previous item
				if (previousItem) {
					previousItem.classList.remove('active');

				}
				focusedIndex++;
				const listItem = list.children[focusedIndex];
				listItem.classList.add('active');
				previousItem = listItem;
			}
		}
	});
}


