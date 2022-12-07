const data = require('./day05-input');

const parseline = (str) => {
    let caret = 0;

    const x1 = parseInt(str.slice(caret, str.indexOf(',')));
    caret = str.indexOf(',', 0) + 1;

    const y1 = parseInt(str.slice(caret, str.indexOf(' ')));
    caret = str.indexOf('>') + 1

    const x2 = parseInt(str.slice(caret, str.indexOf(',', caret)));
    caret =  str.indexOf(',', caret) + 1;

    const y2 = parseInt(str.slice(caret, str.length))
    return { x1, x2, y1, y2 };
}

const hashEntry = (obj, x, y) => {
    if(obj[`${x},${y}`] === undefined)
        obj[`${x},${y}`] = 1;
    else
        obj[`${x},${y}`]++;
}

const mainP1 = (input) => {
    const hash = {};
    input.forEach(line => {
        let h, v, min, max;
        const { x1, x2, y1, y2} = parseline(line);
        if(y1 === y2 && x1 !== x2) h = true;
        if(x1 === x2 && y1 !== y2) v = true;

        if(h) {
            max = Math.max(x1, x2);
            min = Math.min(x1, x2);

            for(let i=min; i<=max; i++) {
                hashEntry(hash, i, y1);
            }
        }

        if(v) {
            max = Math.max(y1, y2);
            min = Math.min(y1, y2);

            for(let i=min; i<=max; i++) {
                hashEntry(hash, x1, i);
            }
        }        
    });
    const intersectionsCount = Object.values(hash).filter(x => x>=2).length;
    console.log(`Vertical and horizontal intersections count: ${intersectionsCount}`);
    return hash;
}

const mainP2 = (hash, input) => {
    input.forEach(line => {
        let f, diff;
        const { x1, x2, y1, y2 } = parseline(line);
        if(y1 !== y2 && x1 !== x2) f = true;
        if(f) {
            if(x1 < x2 && y1 < y2) {
                diff = Math.abs(x2 - x1);
                for(let i=0; i<=diff; i++) {
                    hashEntry(hash, x1+i, y1+i);
                }
            }
            if(x1 < x2 && y1 > y2) {
                diff = Math.abs(x2 - x1);
                for(let i=0; i<=diff; i++) {
                    hashEntry(hash, x1+i, y1-i);
                }
            }
            if(x1 > x2 && y1 < y2) {
                diff = Math.abs(x2 - x1);
                for(let i=0; i<=diff; i++) {
                    hashEntry(hash, x1-i, y1+i);
                }
            }
            if(x1 > x2 && y1 > y2) {
                diff = Math.abs(x2 - x1);
                for(let i=0; i<=diff; i++) {
                    hashEntry(hash, x1-i, y1-i);
                }
            }
        }
    });
    const intersectionsCount = Object.values(hash).filter(x => x>=2).length;
    console.log(`All, diagonal incl, intersections count: ${intersectionsCount}`);
}

mainP2(mainP1(data), data)