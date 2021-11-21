const { Device } = require('./device')

class Voltmeter extends Device {
    constructor(circuit, interval) {
        super(circuit, interval)
        this.Re = 0
        this.VL = 0
    }

    calculate() {
        this.Re = (1/this.Circuit.R1 + 1/this.Circuit.RL).toFixed(2)
        this.VL = (this.Circuit.I * this.Re).toFixed(2)

        this.show()
    }

    show() {
        console.log(`Voltmeter=${this.VL}V`)
    }
}

exports.Voltmeter = Voltmeter
