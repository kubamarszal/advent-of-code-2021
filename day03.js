// Note from the author: I'm not superproud of this piece of code,
// especially the quadratic time complexity produced in the algorithms
// I'm not even sure if this can be done more elegant way, need to check
// some reddit discussions
// ...
// but at the end of the day it works :D 

const data = require('./day03-input');
const clone1 = JSON.parse(JSON.stringify(data));
const clone2 = JSON.parse(JSON.stringify(data));

const getOnesCount = (input) => {
    const arr = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    for(let i = 0 ; i<input.length ; i++) {
        for(let j=0 ; j<input[i].length; j++) { 
            if(input[i][j] === '1')
                arr[j]++;
        }
    }
    return arr;
}

const invert = (binStr) => {
    let inverted = '';
    for(let i=0 ; i<binStr.length ; i++) {
        if(binStr[i] === '1')
            inverted += '0'
        else
            inverted += '1'
    }
    return inverted
}

const powerConsumption = (input) => {
    const onesCount = getOnesCount(input);
    const inputLen = input.length;
    let gamma2 = '';
    onesCount.forEach(item => {
        if(item > inputLen/2)
            gamma2 += '1';
        else
            gamma2 += '0';
    })

    let epsilon2 = invert(gamma2);

    const gamma10 = parseInt(gamma2, 2)
    const epsilon10 = parseInt(epsilon2, 2)
    return gamma10*epsilon10;
}

const o2co2Rating = (input, o2) => {
    for(let i=0;i<12;i++) {
        if(input.length === 1)
            return parseInt(input, 2);
        const onesCount = getOnesCount(input);
        const inputLen = input.length;
        const toBeRemoved = []
        for(let j=0;j<inputLen;j++) {
            if(o2) {
                if(input[j][i] === '0' && onesCount[i] >= inputLen/2)
                    toBeRemoved.push(j);
                else if(input[j][i] === '1' && onesCount[i] < inputLen/2)
                    toBeRemoved.push(j);
            } else {
                if(input[j][i] === '0' && onesCount[i] < inputLen/2)
                    toBeRemoved.push(j);
                else if(input[j][i] === '1' && onesCount[i] >= inputLen/2)
                    toBeRemoved.push(j);
            }
        } 

        for(let k=toBeRemoved.length - 1;k>=0;k--)
            input.splice(toBeRemoved[k], 1)
    }

    return parseInt(input, 2);
}

console.log(`Power consumption: ${powerConsumption(data)}`);
console.log(`Life support rating: ${o2co2Rating(clone1, true) * o2co2Rating(clone2, false)}`);