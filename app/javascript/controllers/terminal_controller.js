import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = [ "ui", "commandField"]

    initialize() {
        this.index = 0
        this.showCurrentUi()
        document.addEventListener("keydown", this.handleKeyDown)
    }

    showHelper() {
        this.index = 0
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
    }

    showCurrentUi() {
        this.uiTargets.forEach((element, index) => {
            element.hidden = index !== this.index
            this.currentElement = element.children[0]

            if(index === this.index) {
                this.currentElement.focus()
                this.currentElement.addEventListener("blur", this.handleBlur)
            } else {
                this.currentElement.removeEventListener("blur", this.handleBlur)
            }
        })
    }

    handleKeyDown = (e) => {
        if(e.ctrlKey && e.key === "c"){
            this.showCommandForm()
        } else if (e.key === "Enter" && this.index === 1) {
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
    }

    handleBlur = () => {
        this.showHelper()
    }
}
