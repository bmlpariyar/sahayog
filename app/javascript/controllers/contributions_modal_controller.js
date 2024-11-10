// app/javascript/controllers/contributions_modal_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container", "overlay"]
  static values = {
    activeTab: String
  }

  connect() {
    this.close()
  }

  open(event) {
    const button = event.currentTarget
    const tabToActivate = button.dataset.tab || 'all'

    this.containerTarget.classList.remove("hidden")
    document.body.style.overflow = "hidden"

    // Dispatch a custom event to activate the correct tab
    this.containerTarget.dispatchEvent(new CustomEvent('activate-tab', {
      detail: { tab: tabToActivate },
      bubbles: true
    }))
  }

  close() {
    setTimeout(() => {
      this.containerTarget.classList.add("hidden")
    }, 100)
    document.body.style.overflow = "auto"
  }
}