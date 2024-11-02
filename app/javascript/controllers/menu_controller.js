// app/javascript/controllers/menu_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["modal"]

    connect() {
        document.addEventListener("click", this.handleOutsideClick.bind(this))
    }

    disconnect() {
        document.removeEventListener("click", this.handleOutsideClick.bind(this))
    }

    toggle(event) {
        event.stopPropagation()
        this.modalTarget.classList.toggle("hidden")
    }

    handleOutsideClick(event) {
        if (!this.element.contains(event.target)) {
            this.modalTarget.classList.add("hidden")
        }
    }
}