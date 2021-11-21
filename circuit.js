const { Voltmeter } = require('./voltmeter')
const { Ammeter } = require('./ammeter')
const { Ohmmeter } = require('./ohmmeter')

class Circuit {
    constructor(v, r1, r2, rl, t2) {
        this.V = v
        this.R1 = r1
        this.R2 = r2
        this.RL = rl
        this.t2 = t2 * 1000
        this.Re = 0
        this.I = 0

        // timer related
        this.Interval = 1000
        this.Timer = null
        this.Elapsed = 0

        this.Ammeter = new Ammeter(this, 300)
        this.Voltmeter = new Voltmeter(this, 100)
        this.Ohmmeter = new Ohmmeter(this, 1000)
        
        // events
        this._triggers = {}
    }

    start() {
        if (this.Timer) {
            return
        }

        console.log("Starting Circuit...")

        this.Voltmeter.start()
        this.Ammeter.start()
        this.Ohmmeter.start()

        this.Timer = setInterval(() => {
            this.Elapsed += this.Interval

            if (this.Elapsed > this.t2) {
                this.stop()
            } else {
                this.calculate()
            }

        }, this.Interval)
    }

    stop() {
        console.log("Stoping Circuit...")

        this.Voltmeter.stop()
        this.Ammeter.stop()
        this.Ohmmeter.stop()

        clearInterval(this.Timer)
        this.Timer = null
    }

    restart() {
        console.log("Re-starting Circuit...")

        this.stop()
        this.start()
    }

    calculate() {
        this.Re = (1/(this.R1 + this.R2) + 1/this.RL).toFixed(2)
        this.I = (this.V / this.Re).toFixed(2)

        this.R1 += 10
        this.R2 -= 10

        this.show()
        this.triggerEvent('change', this)
    }

    show() {
        console.log(`Time: ${this.Elapsed/1000}s V=${this.V}V Re=${this.Re}Ω I=${this.I}A R1=${this.R1}Ω R2=${this.R2}Ω RL=${this.RL}Ω`)
    }

    on(event, callback) {
        if(!this._triggers[event])
            this._triggers[event] = [];
        this._triggers[event].push( callback );
      }
  
      triggerEvent(event, params) {
        if(this._triggers[event] ) {
            for( i in this._triggers[event] )
                this._triggers[event][i](params);
        }
    }
}

exports.Circuit = Circuit