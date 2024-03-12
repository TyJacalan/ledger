import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = [ "ui" ]

    initialize() {
        this.index = 0
        this.showCurrentUi()
        document.addEventListener("keydown", e => this.handleKeyDown(e))
    }

    handleKeyDown(e) {
        if(e.ctrlKey && e.key === "c"){
            this.showCommandForm()
        }
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

    showCurrentUi() {
        this.uiTargets.forEach((element, index) => {
            element.hidden = index !== this.index
        })
    }
}
