const data = require('./day03-input');

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

const main = (input) => {
    const arr = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const inputLen = input.length;
    for(let i = 0 ; i<input.length ; i++) {
        for(let j=0 ; j<input[i].length; j++) { 
            if(input[i][j] === '1')
                arr[j]++;
        }
    }
    
    let gamma2 = '';
    console.log(arr, inputLen);
    arr.forEach(item => {
        if(item > inputLen/2)
            gamma2 += '1';
        else
            gamma2 += '0';
    })

    let epsilon2 = invert(gamma2);

    const gamma10 = parseInt(gamma2, 2)
    const epsilon10 = parseInt(epsilon2, 2)
    console.log(gamma10);
    console.log(epsilon10);
    console.log(gamma10*epsilon10)
}

main(data)