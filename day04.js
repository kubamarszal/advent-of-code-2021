const { cards, numbers } = require('./day04-input');

const alreadyWon = new Set();

const checkWinnings = (cards) => {
    let winningCards = [];
    for(let i=0;i<cards.length;i++){
        let cardResult = 0;
        for(let j=0;j<cards[0].length;j++) {
            let colResult = 1;
            let rowResult = 1;
            for(let k=0;k<cards[0][0].length;k++) {
                colResult *= cards[i][k][j];
                rowResult *= cards[i][j][k];
            }
            if(colResult === 1 || rowResult === 1)
                cardResult = 1;
        }
        if(cardResult === 1) {
            if(!alreadyWon.has(i))
                winningCards.push(i);
            alreadyWon.add(i);
        }
    }
    return winningCards;
}

const ccGen = (input, results, cardsCollection) => {
    input.forEach((card, i) => {
        results.push([]);
        card.forEach((row, j) => {
            results[i].push([]);
            row.forEach((cell, k) => {
                results[i][j].push(0);
    
                if(cardsCollection[cell] === undefined)
                    cardsCollection[cell] = [];
    
                cardsCollection[cell].push({
                    card: i,
                    row: j,
                    cell: k,
                });
            })
        })
    })
}

const calcResult = (results, input, wc) => {
    let sum = 0;

    for(let i=0;i<results[wc].length;i++) {
        for(let j=0;j<results[wc][0].length;j++) {
            if(results[wc][i][j] === 0)
                sum += input[wc][i][j];
        }
    }

    return sum
}

const main = (input, nums) => {
    const cardsCollection = {};
    const results = new Array();

    ccGen(input, results, cardsCollection);

    nums.forEach(number => {
        const actions = cardsCollection[number];
        actions.forEach(action => {
            const { card, row, cell } = action;
            results[card][row][cell] = 1;
        })

        const final = checkWinnings(results);
        if(final.length > 0) {
            if(alreadyWon.size === 1) {
                const winningCard = final[0];
                let sum = calcResult(results, input, winningCard);
                console.log('-----FIRST-----')
                console.log(`Winning card: ${winningCard}`);
                console.log(`Winning number: ${number}`);
                console.log(`Sum: ${sum}`)
                console.log(`Final results: ${sum*number}`)
            }
            if(alreadyWon.size === 100) {
                const winningCard = final[0];
                let sum = calcResult(results, input, winningCard);
                console.log('-----LAST-----')
                console.log(`Winning card: ${winningCard}`);
                console.log(`Winning number: ${number}`);
                console.log(`Sum: ${sum}`)
                console.log(`Final results: ${sum*number}`)
            }
        }
    })
}

main(cards, numbers);