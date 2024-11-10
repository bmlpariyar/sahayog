// app/javascript/controllers/circular_progress_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["bar", "amountText"]
    static values = {
        currentAmount: Number,
        goalAmount: Number
    }

    connect() {

        this.updateProgress()
    }

    currentAmountValueChanged() {
        this.updateProgress()
    }

    goalAmountValueChanged() {
        this.updateProgress()
    }

    updateProgress() {
        const circle = this.barTarget
        const radius = 44
        const circumference = radius * 2 * Math.PI

        // Calculate percentage
        const percentage = (this.currentAmountValue / this.goalAmountValue) * 100

        // Update the circle
        const offset = circumference - (percentage / 100) * circumference
        circle.style.strokeDasharray = `${circumference} ${circumference}`
        circle.style.strokeDashoffset = offset

        // Update the text if it exists
        if (this.hasAmountTextTarget) {
            this.amountTextTarget.textContent =
                `${percentage.toFixed(2)}%`
        }
    }
}