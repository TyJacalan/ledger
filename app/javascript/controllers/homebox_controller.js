import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    triggerResetManager() {
        window.dispatchEvent(new CustomEvent("reset-manager"))
    }
}