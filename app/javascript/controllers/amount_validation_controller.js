import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["input", "errorMessage"];

  connect() {
    console.log("AmountValidationController connected");

    // Listen for input changes
    this.inputTarget.addEventListener("input", this.validate.bind(this));
  }

  validate() {
    const amountValue = parseFloat(this.inputTarget.value);
    console.log("Amount value:", amountValue);

    // Check for valid number input
    if (isNaN(amountValue)) {
      this.inputTarget.value = 0; // Reset to 0 if input is not a number
      this.errorMessageTarget.textContent = "Please enter a valid number.";
      this.errorMessageTarget.classList.remove("hidden"); // Show the error message
      return; // Prevent further processing
    }

    // Check for maximum amount
    if (amountValue > 10000) {
      this.inputTarget.value = 10000; // Set value to 10000 if exceeded
      this.errorMessageTarget.textContent = "Amount must be less than or equal to 10,000.";
      this.errorMessageTarget.classList.remove("hidden"); // Show the error message
    } else {
      this.errorMessageTarget.classList.add("hidden"); // Hide the error message
    }
  }

  addAmount(event) {
    const cliked_amt = parseFloat(event.currentTarget.dataset.amount);
    const newValue = cliked_amt;

    if (newValue <= 10000) {
      this.inputTarget.value = newValue; // Update the input with the new value
      this.validate(); // Re-validate after adding the amount
    } else {
      this.inputTarget.value = 10000; // Cap at 10,000
      this.errorMessageTarget.textContent = "Amount must be less than or equal to 10,000.";
      this.errorMessageTarget.classList.remove("hidden"); // Show the error message
    }
  }
}
