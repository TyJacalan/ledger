function handleFocus(){
	const homeBoxes = document.querySelectorAll(".home-box");

	homeBoxes.forEach(function(box, index) {
		box.addEventListener('focus', function(e) {
			box.classList.add("focused");
		});
	});
};
