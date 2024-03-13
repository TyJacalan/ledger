import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    showCommandForm() {
        window.dispatchEvent(new CustomEvent("show-command-form"))
    }

    showToast() {
        console.log("showing toast")
        window.dispatchEvent(new CustomEvent("show-toast"))
    }
}
