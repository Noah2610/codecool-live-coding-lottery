#!/usr/bin/env node

const prompt = require("prompt-sync")();

const LOTTERY_TICKET_LENGTH = 6;
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

function getUserTicket(userId) {
    console.log(
        `Please input ${LOTTERY_TICKET_LENGTH} numbers between` +
            ` 1 and ${MAX_LOTTERY_NUMBER}, separated by comma` +
            "\nEvery number should only appear once",
    );

    const userInput = prompt(`${userId}. Input: `);
    console.log("");

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
                console.log(
                    `[Invalid input]\nDuplicate number found! ${numberOne}`,
                );
                return getUserTicket(userId);
            }
        }
    }

    if (lotteryTicket.length !== LOTTERY_TICKET_LENGTH) {
        console.log(
            `[Invalid input]\nYou need to input ${LOTTERY_TICKET_LENGTH} positive numbers! ` +
                `You entered ${lotteryTicket.length} number(s).`,
        );
        return getUserTicket(userId);
    }

    return lotteryTicket;
}

function checkMatchingLotteryNumbers(lotteryNumbers, userNumbers) {
    let matchCount = 0;
    let jokerCount = 0;

    for (let i = 0; i < LOTTERY_TICKET_LENGTH; i++) {
        if (lotteryNumbers[i] === userNumbers[i]) {
            jokerCount++;
        }
        for (let j = 0; j < LOTTERY_TICKET_LENGTH; j++) {
            if (lotteryNumbers[i] === userNumbers[j]) {
                matchCount++;
            }
        }
    }

    const isJokerWin = jokerCount === LOTTERY_TICKET_LENGTH;
    const isPrimaryWin = matchCount === LOTTERY_TICKET_LENGTH;
    const isConsolationWin = matchCount >= CONSOLATION_WIN_LENGTH;

    if (isJokerWin) {
        return "joker";
    } else if (isPrimaryWin) {
        return "primary";
    } else if (isConsolationWin) {
        return "consolation";
    } else {
        return null;
    }
}

function generateUserTickets(usersAmount) {
    const userTickets = [];

    for (let i = 0; i < usersAmount; i++) {
        const userId = i + 1;
        const userLotteryTicket = getUserTicket(userId);
        userTickets.push(userLotteryTicket);
    }

    return userTickets;
}

function checkWinningUsers(lotteryNumbers, userTickets) {
    let wins = 0;

    function checkWinningUser(lotteryNumbers, userTicket, userId) {
        const winType = checkMatchingLotteryNumbers(lotteryNumbers, userTicket);

        if (winType === "joker") {
            console.log(`User ${userId} wins with Joker!`);
            wins++;
        } else if (winType === "primary") {
            console.log(`User ${userId} wins with Primary!`);
            wins++;
        } else if (winType === "consolation") {
            console.log(`User ${userId} wins with Consolation!`);
            wins++;
        }
    }

    for (let i = 0; i < userTickets.length; i++) {
        const userId = i + 1;
        checkWinningUser(lotteryNumbers, userTickets[i], userId);
    }

    if (wins === 0) {
        console.log("No winners!");
    }

    console.log(`The lottery numbers were:\n${lotteryNumbers.join(", ")}`);
}

function getUsersAmount() {
    const userInput = prompt("How many people are playing? ");
    const usersAmount = parseInt(userInput);
    console.log("");

    if (isNaN(usersAmount)) {
        console.log("[Invalid input]\nPlease input a valid number!");
        return getUsersAmount();
    }

    return usersAmount;
}

const usersAmount = getUsersAmount();
const lotteryNumbers = generateLotteryNumbers();
const userTickets = generateUserTickets(usersAmount);
checkWinningUsers(lotteryNumbers, userTickets);
