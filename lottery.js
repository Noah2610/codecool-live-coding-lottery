const prompt = require("prompt-sync")();

/**
 * Length of the generated and user lottery ticket.
 */
const LOTTERY_TICKET_LENGTH = 6;

/**
 * Top-range of ticket numbers.
 */
const MAX_LOTTERY_NUMBER = 20;

const CONSOLATION_WIN_LENGTH = 3;

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
                console.log(`Duplicate number found! ${numberOne}`);
                return getUserTicket();
            }
        }
    }

    if (lotteryTicket.length !== LOTTERY_TICKET_LENGTH) {
        console.log(
            `You need to input ${LOTTERY_TICKET_LENGTH} positive numbers! ` +
            `You entered ${lotteryTicket.length} number(s).`
        );
        return getUserTicket();
    }

    return lotteryTicket;
}

function checkMatchingLotteryNumbers(lotteryNumbers, userNumbers) {
    /*
    primary winner:
        lottery numbers: 1,2,3,4,5,6
        user numbers:    6,2,3,5,1,4
    joker winner:
        lottery numbers: 1,2,3,4,5,6
        user numbers:    1,2,3,4,5,6
    */

    // Check for winning ticket
    // - loop over both tickets
    let matchCount = 0;

    for (let i = 0; i < LOTTERY_TICKET_LENGTH; i++) {
        for (let j = 0; j < LOTTERY_TICKET_LENGTH; j++) {
            if (lotteryNumbers[i] === userNumbers[j]) {
                matchCount++;
            }
        }
    }

    const isPrimaryWin = matchCount === LOTTERY_TICKET_LENGTH;
    const isConsolationWin = matchCount >= CONSOLATION_WIN_LENGTH;
    if (isPrimaryWin) {
        console.log("PRIMARY WIN!");
    } else if (isConsolationWin) {
        console.log("CONSOLATION WIN!");
    }

    console.log("lotteryNumbers: ", lotteryNumbers);
    console.log("userNumbers: ", userNumbers);
}

const lotteryNumbers = generateLotteryNumbers();
console.log(`Secret lottery numbers: ${lotteryNumbers}`);

const userLotteryTicket = getUserTicket();
console.log(`User's lottery ticket: ${userLotteryTicket}`);

checkMatchingLotteryNumbers(lotteryNumbers, userLotteryTicket);