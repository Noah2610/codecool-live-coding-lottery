const prompt = require("prompt-sync")();

/**
 * Length of the generated and user lottery ticket.
 */
const LOTTERY_TICKET_LENGTH = 6;

/**
 * Top-range of ticket numbers.
 */
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

        const isNumber = !isNaN(number);
        const isNumberInRange = number > 0 && number <= MAX_LOTTERY_NUMBER;

        if (isNumber && isNumberInRange) {
            lotteryTicket.push(number);
        }
    }

    for (let i = 0; i < lotteryTicket.length; i++) {
        const numberOne = lotteryTicket[i];
        for (let j = i + 1; j < lotteryTicket.length; j++) {
            const numberTwo = lotteryTicket[j];
            if (numberOne === numberTwo) {
                // INVALID INPUT
                // DUPLICATE NUMBER FOUND!

                console.log(`Duplicate number found! ${numberOne}`);

                // TODO:
                // - prompt user again for new numbers input
            }
        }
    }

    return lotteryTicket;
}

const lotteryNumbers = generateLotteryNumbers();
console.log(`Secret lottery numbers: ${lotteryNumbers}`);

const userLotteryTicket = getUserTicket();
console.log(`User's lottery ticket: ${userLotteryTicket}`);

// Check for winning ticket
// joker numbers
