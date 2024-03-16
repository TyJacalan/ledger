import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = [ "ui", "commandField", "categoryField", "taskField"]

    connect() {
        this.index = 0
        this.showCurrentUi()
    }

    showHelper() {
        this.index = 0
        this.taskInputIndex = 0
        this.showCurrentUi()
    }

    showCommandForm() {
        this.index = 1
        this.showCurrentUi()
    }

    showCategoryForm() {
        this.index = 2
        this.showCurrentUi()

        this.categoryValues = {}
    }

    showTaskForm() {
        this.index = 3
        this.showCurrentUi()
        
        this.taskValues = {}
        this.taskInputIndex = 0
        this.showCurrentTaskInput()
    }

    showCurrentUi() {
        this.uiTargets.forEach((element, index) => {
            element.hidden = index !== this.index
            this.currentElement = element.children[0]

            if(index === this.index) {
                this.currentElement.focus()
            }
        })
    }

    showCurrentTaskInput() {
        this.taskFieldTargets.forEach((element, index) => {
            if(index !== this.taskInputIndex){
                element.classList.add("hidden")
            } else {
                element.classList.remove("hidden")
                element.focus()
            }
        })
    }

    handleCommandForm() {
        const command = this.commandFieldTarget.value.trim()
        const selectedItem = document.querySelector('.selected-item')
        this.commandFieldTarget.value = ""

        switch (command) {
            case ":C":
                this.showCategoryForm()
                break;
            case ":T":
                this.showTaskForm()
                break;
            case ":E":
                this.handleEdit(selectedItem)
                break;
            case ":D":
                this.handleDestroy(selectedItem)
                break;
            case ":S":
                this.toggleStatus(selectedItem)
                break;
            case ":X":
                this.handleLogout()
                break;
        }
    }

    handleCategoryForm() {
        const name = this.categoryFieldTarget.value.trim()
        this.categoryFieldTarget.value = ""

        this.categoryValues['name'] = name
        
        this.submitCategoryForm()
    }

    handleTaskForm() {
        const currentInput = this.taskFieldTargets[this.taskInputIndex]
        const key = currentInput.getAttribute('name')
        const value = currentInput.value.trim()

        this.taskValues[key] = value

        if( this.taskInputIndex < this.taskFieldTargets.length - 1){
            this.taskInputIndex += 1
            this.showCurrentTaskInput()
        } else {
            this.submitTaskForm()
        }
    }

    submitCategoryForm() {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        fetch('/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken
            },
            body: JSON.stringify({ category: this.categoryValues })
        })
            .then(response => {
                if (response.ok) {
                    this.categoryValues = {};
                    this.showHelper();

                    Turbo.visit(window.location.href, { action: "replace" });
                } else {
                    throw new Error('Failed to create category');
                }
            })
            .catch(error => {
                console.error('Error creating category:', error);
            });
    }

    submitTaskForm () {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken
            },
            body: JSON.stringify({ task: this.taskValues })
        })
            .then(response => {
                if (response.ok) {
                    this.taskValues = {};
                    this.showHelper();

                    Turbo.visit(window.location.href, { action: "replace" });
                } else {
                    throw new Error('Failed to create task');
                }
            })
            .catch(error => {
                console.error('Error creating task:', error);
            });
    }

    handleEdit(selectedItem) {
        if(selectedItem){
            const type = selectedItem.dataset.managerTarget

            switch(type){
                case "categoryItem":
                    this.editCategory(selectedItem);
                    break;
                case "taskItem":
                    this.editTask(selectedItem);
                    break;
            }
        }
    }

    handleDestroy(selectedItem) {
        if(selectedItem){
            const type = selectedItem.dataset.managerTarget

            switch(type){
                case "categoryItem":
                    this.deleteCategory(selectedItem);
                    break;
                case "taskItem":
                    this.deleteTask(selectedItem);
                    break;
            }
        }
    }

    editCategory(selectedItem) {
        const categoryId = selectedItem.dataset.categoryId;

        fetch(`/categories/${categoryId}/edit`, { headers: { Accept: "text/vnd.turbo-stream.html" } })
            .then(response => response.text())
            .then(html => Turbo.renderStreamMessage(html))
            .catch(error => console.error('Error deleting category:', error));
    }

    editTask(selectedItem) {
        const taskId = selectedItem.dataset.taskId

        fetch(`/tasks/${taskId}/edit`, { headers: { Accept: "text/vnd.turbo-stream.html" } })
            .then(response => response.text())
            .then(html => Turbo.renderStreamMessage(html))
            .catch(error => console.error('Error deleting category:', error));
    }

    deleteCategory(selectedItem){
        const categoryId = selectedItem.dataset.categoryId;

        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

        fetch(`/categories/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken
            }
        })
            .then(response => response.text())
            .then(html => Turbo.renderStreamMessage(html))
            .catch(error => console.error('Error deleting category:', error));
    }

    deleteTask(selectedItem){
        const taskId = selectedItem.dataset.taskId;

        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

        fetch(`/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken
            }
        })
            .then(response => { 
                response.text() 
                //Turbo.visit(window.location.href, { action: "replace" });
            })
            .then(html => Turbo.renderStreamMessage(html))
            .catch(error => console.error('Error deleting task:', error));
    }

    toggleStatus(selectedItem) {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
        const taskId = selectedItem.dataset.taskId
        let status = selectedItem.dataset.status === "true"

        fetch(`/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken
            },
            body: JSON.stringify({ task: { status: !status } })
        })
            .then(response => {
                response.text()
                window.location.href = "/"
            })
            .catch(error => console.error('Error toggling status:', error))
    }

    handleLogout() {
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
}
