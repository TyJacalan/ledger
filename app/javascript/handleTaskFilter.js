function handleTaskFilter(container, params){
	
	const selectedItem = container.querySelector("li.active");

	if(selectedItem){
	const filterCondition = selectedItem.textContent.trim();

		fetch(`/?${params}=${filterCondition}`)
			.then(response => response.text())
			.then(data => {
				App.removeEventHandlers();

				document.open();
				document.write(data);
				document.close();

				App.initializeEventHandlers();
			})
			.catch(error => {
				console.log("Error filtering tasks:", error);
			});
	} else {
		console.log("No active list item found.");
	}
}

