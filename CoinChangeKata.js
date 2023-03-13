const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter total change amount:\n', (amount) => {
    
    let coinDenoms = {
        quarter: 25,
        dime: 10,
        nickel: 5,
        penny: 1
    };

    let coinCount = {};
    let answer = [];

    for (let coin in coinDenoms) {
        let count = 0;
        while (amount >= coinDenoms[coin]) { // while the amount is greater than the value of the coin denominations being iterated through
            count++; // add 1 to the count (this is going to be the amount of each specific coin that contributes to the total cents)
            coinCount[coin] = count; // let the key in the coinCount object (which would be the coin denomination) have a value of the count (amount of the specific coins needed)
            amount -= coinDenoms[coin]; // update the remaining total cents to loop through
        };
    };

    for (let coin in coinCount) {
        if (coin == 'penny' && coinCount[coin] > 1) {
            coinCount['pennies'] = coinCount[coin];
            delete coinCount[coin];
        } else if (coin !== 'penny' && coinCount[coin] > 1) {
            coinCount[`${coin}s`] = coinCount[coin];
            delete coinCount[coin];
        }
    };

    for (let coin in coinCount) {
       answer.push(`${coinCount[coin]} ${coin}`);
    };

    answer = answer.join(', ');

    console.log(`Based on your total change amount, you will receive: ${answer}.`);

    rl.close();
});