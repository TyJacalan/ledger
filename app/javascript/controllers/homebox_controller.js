import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    triggerResetManager() {
        console.log("reset manager triggered")
        window.dispatchEvent(new CustomEvent("reset-manager"))
    }
}