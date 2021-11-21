const { Device } = require('./device')

class Ammeter extends Device {
    constructor(circuit, interval) {
        super(circuit, interval)
    }

    calculate() {
        this.show()
    }

    show() {
        console.log(`Ammeter=${this.Circuit.I}A`)
    }
}

exports.Ammeter = Ammeter
