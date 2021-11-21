class Device {
    constructor(circuit, interval) {
        this.Circuit = circuit
        this.Timer = null
        this.interval = interval
    }

    start() {
        this.Timer = setInterval(() => {
            this.calculate()
        }, this.interval)
    }

    stop() {
        if (this.Timer) {
            clearInterval(this.Timer)
            this.Timer = null
        }
    }

    calculate() {
        this.show()
    }

    show() {
        console.log(`Circuit=${this.Circuit}`)
    }
}

exports.Device = Device
