import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { projectId: Number }  // Define a value to store the project ID

  connect() {

  }

  async toggleSupport(event) {
    event.preventDefault()

    const response = await fetch(`/projects/${this.projectIdValue}/add_or_remove_support`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
      }
    })

    if (response.ok) {
      const data = await response.json()
      this.updateSupportCount(data.supported)
    } else {
      console.error("Failed to toggle support")
    }
  }

  updateSupportCount(supported) {
    const countElement = this.element.querySelector(".count")
    const currentCount = parseInt(countElement.textContent, 10)
    countElement.textContent = supported ? `${currentCount + 1} support` : `${currentCount - 1} support`

    // Update the heart icon's fill color based on support status
    const heartIcon = this.element.querySelector("svg")
    heartIcon.classList.toggle("fill-red-400", supported)
    heartIcon.classList.toggle("stroke-none", supported)
    heartIcon.classList.toggle("fill-none", !supported)
  }
}
