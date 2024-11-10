// app/javascript/controllers/modal_controller.js
import { Controller } from "@hotwired/stimulus"


export default class extends Controller {
  static targets = ["modal", "image"]

  connect() {
  }

  open(event) {
    event.preventDefault()
    const imageUrl = event.currentTarget.getAttribute("src")
    this.imageTarget.src = imageUrl
    this.modalTarget.classList.remove("hidden")
  }

  close() {
    this.modalTarget.classList.add("hidden")
    this.imageTarget.src = ""
  }
}
