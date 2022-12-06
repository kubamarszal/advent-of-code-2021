const input = require('./day02-input');

class Position {
    constructor(v, h, aim) {
        this.v = v;
        this.h = h;
        this.aim = aim;
    }

    set v(val) { this._v = val }
    set h(val) { this._h = val }
    set aim(val) { this._aim = val }
    get v() { return this._v }
    get h() { return this._h }
    get aim() { return this._aim }

    move(action, value) {
        if(action === 'forward') { this.incH(value) }
        if(action === 'up') this.decV(value)
        if(action === 'down') this.incV(value)
    }
    moveWithAim(action, value) {
        if(action === 'forward') { 
            this.incH(value)
            this.incV(value * this._aim)
        }
        if(action === 'up') this.decAim(value)
        if(action === 'down') this.incAim(value)
    }
    incH(value) { this._h += parseInt(value) }
    incV(value) { this._v += parseInt(value) }
    decV(value) { this._v -= parseInt(value) }
    incAim(value) { this._aim += parseInt(value) }
    decAim(value) { this._aim -= parseInt(value) }
}

const pos1 = new Position(0, 0);
const pos2 = new Position(0, 0, 0);

const split = (str) => {
    const [ action, value ] = str.split(' ');
    return { action, value }
}

const func = (input) => {
    input.forEach(item => {
        const { action, value } = split(item);
        pos1.move(action, value);
        pos2.moveWithAim(action, value);
    });
}

func(input);
console.log(`Position report: V${pos1.v} H${pos1.h}. Multiplied: ${pos1.v*pos1.h}.`)
console.log(`Position report: V${pos2.v} H${pos2.h}. Multiplied: ${pos2.v*pos2.h}.`)