function coinChanger(amount) {

    let coinDenoms = { // Object containing different US coin denominations.
        quarter: 25,
        dime: 10,
        nickel: 5,
        penny: 1
    };

    let coinCount = {}; // Empty object initialized to hold the coinDenoms needed to make change, and the amount of each coin needed to sum to the total change amount
    let answer = []; // Empty array to store a list of formatted string versions of coin denom and the amount of each coin for change

    // This loop will run until the remaining amount of change is 0.
    for (let coin in coinDenoms) { // Iterate through the coin denom object
        let count = 0; // Count to keep track of the amount of each coin needed to make change
        while (amount >= coinDenoms[coin]) { // As long as the value of a coin from the object is less than or equal to the total amount of change needed...
            count++; // Add one to the count for each coin found whose value contributes to the total change amount
            coinCount[coin] = count; // Coin count object will store the coin denominations needed as the key, and the total count of each coin needed as the value
            amount -= coinDenoms[coin]; // Calculates the total amount of change remaining after a coin is added to the coinCount object
        };
    };

    // This loop helps with determining whether the console output of a coin denom that contributes to the total amount of change needed will be singular or plural based on 
    // the total amount of coins needed for each coin denomination.
    for (let coin in coinCount) { // Iterates through the coinCount object created to hold only necessary coins that contribute to the total change amount 
        if (coin == 'penny' && coinCount[coin] > 1) { // Edge case here --> penny should be pennies when plural, not pennys*
            coinCount['pennies'] = coinCount[coin]; // If there is more than 1 penny needed, the new key will be 'pennies'
            delete coinCount[coin]; // Delete the old key for singular 'penny', in this case
        } else if (coin !== 'penny' && coinCount[coin] > 1) { // Condition accounts for all other coin denoms EXCEPT pennies 
            coinCount[`${coin}s`] = coinCount[coin]; // If there is more than 1 of any other coin needed, the new key names will have an 's' at the end of
            delete coinCount[coin]; // Delete the old key for singular coin names, in this case
        }
    }

    // This loop is to assist with formatting the final console output.
    for (let coin in coinCount) { // Iterate through the coin count object whose coin denom keys are now either singular or plural dependent on their values
        answer.push(`${coinCount[coin]} ${coin}`); // Append the amount of each coin needed to the array using string interpolation to help with formatting
    }
    return answer.join(', '); // Return a string representation of the coins needed to make change, adding a comma between multiple denominations if necessary
}

// TESTS ------------------------------------------------------------
console.log(coinChanger(50));   // ==> 2 quarters
console.log(coinChanger(1));    // ==> 1 penny
console.log(coinChanger(33));   // ==> 1 quarter, 1 nickel, 3 pennies
console.log(coinChanger(100));  // ==> 4 quarters
console.log(coinChanger(72));   // ==> 2 quarters, 2 dimes, 2 pennies