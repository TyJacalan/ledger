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

    handleKeyDownEnter(){
        const categoryContainerIsSelected = this.indexValue >= 0 && this.activeContainerIndex === 0
        const dueDateContainerIsSelected = this.indexValue >= 0 && this.activeContainerIndex === 2
        const selectedItem = document.querySelector(".selected-item")

        if(categoryContainerIsSelected){
            this.filterTask(selectedItem, 'category')
        } else if (dueDateContainerIsSelected) {
            this.filterTask(selectedItem, 'due_date')
        } else {
            this.showTask(selectedItem)
        }

    }

    highlightCurrentItem() {
        this.activeList.forEach((element, index) => {
            if(index === this.indexValue){
                element.focus()
                element.classList.add("selected-item")
            } else {
                element.classList.remove("selected-item")
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
        list.forEach((element) => {
            element.classList.remove("selected-item");
        })
    }

    showTask(selectedItem) {
        if(selectedItem){
            const taskId = selectedItem.dataset.taskId
                
            fetch(`/tasks/${taskId}`, { headers: { Accept: "text/vnd.turbo-stream.html" } })
                .then(response => response.text())
                .then(html => Turbo.renderStreamMessage(html))
                .catch(error => console.error('Error showing task:', error));
        }
    }

    filterTask(selectedItem, param) {
        if(selectedItem){
        
        const id = selectedItem.dataset.categoryId || selectedItem.dataset.dueDateId
    
        fetch(`/?${param}=${id}`)
            .then(response => {
                if(response.ok){
                    window.location.href = `/?${param}=${id}`
                }
            })
            .catch(error => console.error('Error filtering tasks:', error));
        }
    }
}
