function handleLogOut() {
	const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

	fetch('/users/sign_out', {
		method: 'DELETE',
		headers: {
			'X-CSRF-Token': csrfToken
		}
	})
		.then(response => {
			if (response.ok) {
				window.location.href = "/users/sign_in";
			} else {
				console.error('Logout failed');
			}
		})
		.catch(error => console.error("Error:", error));
}
