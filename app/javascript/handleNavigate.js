let focusedIndex =  -1;
let previousItem = null;
let list =  null;
let listItem = null;

function handleNavigate(container, listTagName, e){
	list = container.querySelector(listTagName);

	if((e.key === "ArrowUp" || e.key === "ArrowLeft") && focusedIndex > 0){
		e.preventDefault();
		updateFocus(-1);
	} else if ((e.key === "ArrowDown" || e.key === "ArrowRight") && focusedIndex < list.children.length -1) {
		e.preventDefault();
		updateFocus(1);
	}
}

function updateFocus(change){
	if(previousItem != null){
		previousItem.classList.remove('active');
	}

	focusedIndex += change;
	listItem = list.children[focusedIndex];
	listItem.classList.add('active');
	previousItem = listItem;
}

function resetFocus() {
    if (previousItem !== null) {
        previousItem.classList.remove('active');
    }

    focusedIndex = -1;
    previousItem = null;
}