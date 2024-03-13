import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["homeBox"]

    connect() {
        this.index = 0;
        this.focusCurrentBox()
    }

    nextBox() {
        this.indexValue++
        this.focusCurrentBox()
    }

    prevBox() {
        this.indexValue--
        this.focusCurrentBox()
    }

    focusCurrentBox() {
        this.homeBoxTargets.forEach((element, index) => {
            element.focus() = index != this.indexValue
        })
    }

    showCommandForm() {
        window.dispatchEvent(new CustomEvent("show-command-form"))
    }

    showToast() {
        console.log("showing toast")
        window.dispatchEvent(new CustomEvent("show-toast"))
    }
}
