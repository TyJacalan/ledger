document.addEventListener('DOMContentLoaded', function(){
    const homeBoxes = document.querySelectorAll(".home-box");
    
    console.log(homeBoxes);

    homeBoxes.forEach(function(box, index) {
        box.addEventListener('focus', function(e) {
            const focusedElement = e.target;
            console.log('Currently focused element:', focusedElement.tabIndex);
        });
    });
});
