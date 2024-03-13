import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["list", "categoryItem", "taskItem", "dueDateItem" ]

    connect() {
        this.indexValue = -1
        this.activeContainerIndex = null
        this.activeList = null
    }

    nextItem() {
        this.setActiveContainer()

        if(this.indexValue < this.activeList.length - 1){
            this.indexValue++
            this.highlightCurrentItem()
        }
    }

    prevItem() {
        this.setActiveContainer()
        
        if(this.indexValue > 0){
            this.indexValue--
            this.highlightCurrentItem()
        }
    }

    setActiveContainer() {
        this.listTargets.forEach((element, index) => {
            if(document.activeElement === element.children[0]){
                this.activeContainerIndex = index
                switch(index) {
                    case 0:
                        this.activeList = this.categoryItemTargets
                        break;
                    case 1:
                        this.activeList = this.taskItemTargets
                        break;
                    case 2:
                        this.activeList = this.dueDateItemTargets
                        break;
                }
            }
        })
    }

    highlightCurrentItem() {
        this.activeList.forEach((element, index) => {
            if(index === this.indexValue){
                element.classList.add("bg-secondary")
            } else {
                element.classList.remove("bg-secondary")
            }
        })
    }

    resetManager() {
        this.indexValue = -1
        this.removeHighlights(this.categoryItemTargets)
        this.removeHighlights(this.taskItemTargets)
        this.removeHighlights(this.dueDateItemTargets)
    }

    removeHighlights(list) {
        list.forEach((element, index) => {
            element.classList.remove("bg-secondary")
        })
    }

    showTask() {
        if(this.indexValue >= 0 && this.activeContainerIndex === 1){
            
            const selectedTaskElement = this.activeList[this.indexValue]
            const taskId = selectedTaskElement.dataset.taskId;
            
            if(taskId){
                fetch(`/tasks/${taskId}`)
                    .then(response => response.json())
                    .then(task => {
                        console.log("Task details:", task)
                    })
                    .catch(error => {
                        console.error("Error fetching task details:", error)
                    })
            }
        }
    }
}
