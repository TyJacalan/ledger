const Navigator = {
	focusedIndex: -1,
	previousItem: null,
	list: null,
	listItem: null,

	handleNavigate: function(container, listTagName, e) {
		this.list = container.querySelector(listTagName);

		if ((e.key === "ArrowUp" || e.key === "ArrowLeft") && this.focusedIndex > 0) {
			e.preventDefault();
			this.updateFocus(-1);
		} else if ((e.key === "ArrowDown" || e.key === "ArrowRight") && this.focusedIndex < this.list.children.length - 1) {
			e.preventDefault();
			this.updateFocus(1);
		}
	},
	updateFocus: function(change) {
		if (this.previousItem) {
			this.previousItem.classList.remove('active');
		}
		this.focusedIndex += change;
		this.listItem = this.list.children[this.focusedIndex];
		this.listItem.classList.add('active');
		this.previousItem = this.listItem;
	}
};

