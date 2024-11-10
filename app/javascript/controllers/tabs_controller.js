import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["tab", "panel"]

    connect() {
        // Listen for the custom event
        this.element.addEventListener('activate-tab', this.handleActivateTab.bind(this))

        if (this.tabTargets.length > 0) {
            this.select({ target: this.tabTargets[0] })
        }
    }

    handleActivateTab(event) {
        const tabToActivate = event.detail.tab
        const targetTab = this.tabTargets.find(tab => tab.dataset.tab === tabToActivate)
        if (targetTab) {
            this.select({ target: targetTab })
        }
    }

    select(event) {
        const selectedTab = event.target
        const tabName = selectedTab.dataset.tab

        // Update tab styles
        this.tabTargets.forEach(tab => {
            if (tab === selectedTab) {
                // Add active styles to selected tab
                tab.classList.add('border-b-2', 'border-green-500', 'text-green-600')
                tab.classList.remove('border-transparent', 'text-gray-500')
            } else {
                // Remove active styles from other tabs
                tab.classList.remove('border-b-2', 'border-green-500', 'text-green-600')
                tab.classList.add('border-transparent', 'text-gray-500')
            }
        })


        this.panelTargets.forEach(panel => {
            panel.classList.toggle("hidden", panel.dataset.tab !== tabName)
        })
    }
}
