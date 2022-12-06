const inputData = require('./day01-input');

const transform = (input) => {
    const arr = [];
    for(let i = 1; i < input.length - 1 ; i++) {
        const sum = input[i-1] + input[i] + input[i+1];
        arr.push(sum)
    }
    return arr;
}

const funct = (input) => {
    let prev = input[0];
    let inc = 0, dec = 0;
    input.forEach(item => {
        if(item > prev) inc++;
        if(item < prev) dec++;
        prev = item;
    });

    return { inc, dec };
}

const { inc:inc1, dec:dec1 } = funct(inputData);

console.log(`Part 1: inc: ${inc1}, dec: ${dec1}`)

const { inc:inc2, dec:dec2 } = funct(transform(inputData));

console.log(`Part 2: inc: ${inc2}, dec: ${dec2}`)