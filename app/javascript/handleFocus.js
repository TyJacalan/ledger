function handleFocus() {
    const homeBoxes = document.querySelectorAll(".home-box");

    homeBoxes.forEach(function(box) {
        box.addEventListener('focus', onFocus);
        box.addEventListener('blur', onBlur);
    });
};

function removeHandleFocus() {
    const homeBoxes = document.querySelectorAll(".home-box");

    homeBoxes.forEach(function(box) {
        box.removeEventListener('focus', onFocus);
        box.removeEventListener('blur', onBlur);
    });
}

function onFocus(event) {
    event.currentTarget.classList.add("focused");
}

function onBlur(event) {
    resetFocus();
}