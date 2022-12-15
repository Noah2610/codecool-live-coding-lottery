// Generate random lottery numbers
// (saved to array)
// picked from number set 1 - 20

const LOTTERY_NUMBERS_LENGTH = 6;
const RANDOM_NUMBER_RANGE = 20;

const lotteryNumbers = [];
while (lotteryNumbers.length < LOTTERY_NUMBERS_LENGTH) {
    const number = Math.floor(Math.random() * RANDOM_NUMBER_RANGE) + 1;

    if (!lotteryNumbers.includes(number)) {
        lotteryNumbers.push(number);
    }
}

console.log(lotteryNumbers);

// User input:
// for ticket and for picking their numbers

// Check for winning ticket
// joker numbers