import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = [ "ui", "commandField", "taskField"]

    initialize() {
        this.index = 0
        this.showCurrentUi()
        document.addEventListener("keydown", this.handleKeyDown)
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

    handleKeyDown = (e) => {
        if(e.ctrlKey && e.key === "c"){
            this.showCommandForm()
        } else if (e.key === "Enter" && this.index === 1) {
            //command Form controls
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
        } else if (e.key === "Enter" && this.index === 3) {
            //task form controls
            
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
                    //window.location.reload()
                    Turbo.visit(window.location.href, { action: "replace" });
                } else {
                    throw new Error('Failed to create task');
                }
            })
            .catch(error => {
                console.error('Error creating task:', error);
            });
    }

    handleBlur = () => {
        this.showHelper()
    }
}
