function handleNavigateBoxes(e) {
    e.preventDefault();

    const boxes = Array.from(document.querySelectorAll('[tabIndex]'));

    const focusedBoxIndex = boxes.findIndex(box => document.activeElement === box);

    if (focusedBoxIndex !== -1) {
        let newIndex = focusedBoxIndex;

        if (e.ctrlKey && e.key === 'j' && focusedBoxIndex > 0 ) {
            newIndex -= 1; // Move to the previous box
        } else if (e.ctrlKey && e.key === 'k' && focusedBoxIndex < boxes.length - 1) {
            newIndex += 1; // Move to the next box
        }

        boxes[newIndex].focus();
    } else {
        boxes[0].focus();
    }
}
