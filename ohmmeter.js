const { Device } = require('./device')

class Ohmmeter extends Device {
    constructor(circuit, interval) {
        super(circuit, interval)
        this.Rnow = 0
        this.Rlast = 0
        this.Ravg = 0
    }

    calculate() {
        this.Rlast = this.Rnow

        this.Rnow = (1/this.Circuit.R1 + 1/this.Circuit.R2 + 1/this.Circuit.RL)/3

        this.Ravg = ((this.Rnow + this.Rlast)/2).toFixed(2)

        this.show()
    }

    show() {
        console.log(`Ohmmeter=${this.Ravg}Ω`)
    }
}

exports.Ohmmeter = Ohmmeter
