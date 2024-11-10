// app/javascript/controllers/progress_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ["bar", "amountText"];
    static values = { currentAmount: Number, goalAmount: Number };

    connect() {

        // Initialize with values from HTML attributes
        this.update({
            detail: {
                currentAmount: this.currentAmountValue || 0, // Default to 0 if undefined
                goalAmount: this.goalAmountValue || 1        // Default to 1 to avoid division by zero
            }
        });
    }

    update(event) {
        const { currentAmount, goalAmount } = event.detail;
        // Calculate progress as a percentage
        const percentage = Math.min((currentAmount / goalAmount) * 100, 100);
        // Update the width and text of the progress bar
        this.barTarget.style.width = `${percentage}%`;
        this.amountTextTarget.textContent = `${percentage.toFixed(2)}%`;
    }
}
