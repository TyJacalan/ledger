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
        this.commandFieldTarget.value = ""

        switch (command) {
            case ":C":
                this.showCategoryForm()
                break;
            case ":T":
                this.showTaskForm()
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
}
