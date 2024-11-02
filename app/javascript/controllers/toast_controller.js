import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["container"]
    static values = {
        message: String,
        type: String,
        duration: { type: Number, default: 4000 }
    }

    connect() {
        if (this.messageValue) {
            this.containerTarget.classList.add('opacity-0', 'translate-y-4')
            this.timeLeft = this.durationValue
            this.isPaused = false

            setTimeout(() => {
                this.showToast()
            }, 100)
        }
    }

    showToast() {
        this.containerTarget.classList.remove('opacity-0', 'translate-y-4')
        this.containerTarget.classList.add('opacity-100', 'translate-y-0')

        // Start the timer
        this.startTimer()
    }

    startTimer() {
        this.startTime = Date.now()
        this.timeout = setTimeout(() => {
            this.hideToast()
        }, this.timeLeft)
    }

    pauseTimer() {
        if (!this.isPaused) {
            clearTimeout(this.timeout)
            this.timeLeft -= Date.now() - this.startTime
            this.isPaused = true
        }
    }

    resumeTimer() {
        if (this.isPaused) {
            this.isPaused = false
            this.startTimer()
        }
    }

    // Mouse enter event
    mouseEnter() {
        this.pauseTimer()
    }

    // Mouse leave event
    mouseLeave() {
        this.resumeTimer()
    }

    hideToast() {
        clearTimeout(this.timeout) // Clear any existing timeout
        this.containerTarget.classList.remove('opacity-100', 'translate-y-0')
        this.containerTarget.classList.add('opacity-0', 'translate-y-4')

        setTimeout(() => {
            this.element.remove()
        }, 500)
    }

    close() {
        this.hideToast()
    }
}