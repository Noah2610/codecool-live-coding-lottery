const prompt = require("prompt-sync")();

const LOTTERY_TICKET_LENGTH = 6;
const MAX_LOTTERY_NUMBER = 20;

function generateLotteryNumbers() {
    const lotteryNumbers = [];

    while (lotteryNumbers.length < LOTTERY_TICKET_LENGTH) {
        const number = Math.floor(Math.random() * MAX_LOTTERY_NUMBER) + 1;

        if (!lotteryNumbers.includes(number)) {
            lotteryNumbers.push(number);
        }
    }

    return lotteryNumbers;
}

function getUserTicket() {
    console.log(
        `Please input ${LOTTERY_TICKET_LENGTH} numbers between` +
        ` 1 and ${MAX_LOTTERY_NUMBER}, separated by comma` +
        "\nEvery number should only appear once"
    );

    const userInput = prompt("Input: ");

    const userInputCommaSeparated = userInput.split(",");
    const lotteryTicket = [];

    for (let i = 0; i < userInputCommaSeparated.length; i++) {
        const number = parseInt(userInputCommaSeparated[i]);

        // TODO: Validate input
        //   - check if they are valid numbers
        //   - check if numbers are between 1 and 20
        //   - check for duplicate numbers

        lotteryTicket.push(number);
    }

    return lotteryTicket;
}

const lotteryNumbers = generateLotteryNumbers();
console.log(`Secret lottery numbers: ${lotteryNumbers}`);

const userLotteryTicket = getUserTicket();
console.log(`User's lottery ticket: ${userLotteryTicket}`);

// Check for winning ticket
// joker numbers
