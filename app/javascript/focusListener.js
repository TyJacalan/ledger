document.addEventListener('DOMContentLoaded', function(){
    const homeBoxes = document.querySelectorAll(".home-box");
    
    homeBoxes.forEach(function(box, index) {
        box.addEventListener('focus', function(e) {
            const focusedElement = e.target;
            //console.log('Currently focused element:', focusedElement.tabIndex);
        });
    });
});
