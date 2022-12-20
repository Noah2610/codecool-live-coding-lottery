const prompt = require("prompt-sync")();

// Generate random lottery numbers
// picked from number set 1 - 20

const LOTTERY_NUMBERS_LENGTH = 6;
const RANDOM_NUMBER_RANGE = 20;

function generateLotteryNumbers() {
    const lotteryNumbers = [];

    while (lotteryNumbers.length < LOTTERY_NUMBERS_LENGTH) {
        const number = Math.floor(Math.random() * RANDOM_NUMBER_RANGE) + 1;

        if (!lotteryNumbers.includes(number)) {
            lotteryNumbers.push(number);
        }
    }

    return lotteryNumbers;
}

function getUserTicket() {
    // User input:
    // for picking their numbers
    //
    // Style of input:
    // input 6 numbers separated by comma
    //   5, 1, 2, 6, 2, 3
    //
    // Steps:
    // - prompt user to input comma-separated numbers
    //   - tell user that numbers are between 1 and 20
    console.log(
        `Please input ${LOTTERY_NUMBERS_LENGTH} numbers between` +
        ` 1 and ${RANDOM_NUMBER_RANGE}, separated by comma` +
        "\nEvery number should only appear once"
    );

    // - get user input string
    const userInput = prompt("Input: ");

    // - split by comma separator
    //   "1, 2, 3" => ["1", "2", "3"]
    //   "1,2,3"   => ["1", "2", "3"]
    const userInputSplit = userInput.split(",");
    const lotteryTicket = [];

    for (let i = 0; i < userInputSplit.length; i++) {
        const item = userInputSplit[i];
        lotteryTicket.push(parseInt(item));
    }

    return lotteryTicket;

    // - validate input
    //   - check if they are valid numbers
    //   - check if numbers are between 1 and 20
    //   - check for duplicate numbers
}

const lotteryNumbers = generateLotteryNumbers();
console.log(lotteryNumbers);

const lotteryTicket = getUserTicket();
console.log(lotteryTicket);

// Check for winning ticket
// joker numbers
