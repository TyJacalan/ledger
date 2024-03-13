import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["homeBox"]

    connect() {
        this.indexValue = -1
    }

    nextBox() {
        if(this.indexValue < this.homeBoxTargets.length - 1){

            this.checkCurrentBox()
            this.indexValue++

            this.focusCurrentBox()
        }
    }

    prevBox() {
        if(this.indexValue > 0){
            
            this.checkCurrentBox()
            this.indexValue--

            this.focusCurrentBox()
        }
    }

    checkCurrentBox() {
        this.homeBoxTargets.forEach((element, index) => {
            if(document.activeElement === this.homeBoxTargets[index]){
                this.indexValue = index
            }
        })
    }

    focusCurrentBox() {
        window.dispatchEvent(new CustomEvent("reset-manager"))
        this.homeBoxTargets.forEach((element, index) => {
            if(index === this.indexValue){
                element.focus()
            }
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
