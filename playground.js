#!/bin/env node

const prompt = require("prompt-sync")({ sigint: true });

function getPossibleNumbers() {
    return Array.from({ length: 20 }).map((_, i) => i + 1);
}

function getRandomNumbers() {
    const possibleNumbers = [...POSSIBLE_NUMBERS];
    const numbers = [];

    for (let i = 0; i < AMOUNT_OF_NUMBERS; i++) {
        const idx = Math.floor(Math.random() * possibleNumbers.length);
        numbers.push(possibleNumbers.splice(idx, 1)[0]);
    }
    return numbers;
}

function getPlayerNumbers() {
    let numbers = null;

    while (numbers === null) {
        const input = prompt(
            `your picks (${AMOUNT_OF_NUMBERS} comma-separated numbers from 1-${POSSIBLE_NUMBERS.length}): `,
        );
        const nums = input.split(",").map((w) => parseInt(w.trim()));
        let isValid = nums.length === AMOUNT_OF_NUMBERS;

        for (let i = 0; i < nums.length; i++) {
            if (Number.isNaN(nums[i])) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            numbers = nums;
        } else {
            console.log("Invalid input, please enter a valid list of numbers");
        }
    }

    return numbers;
}

function countNumberOverlap(listA, listB) {
    let count = 0;
    for (const numA of listA) {
        if (listB.includes(numA)) {
            count++;
        }
    }
    return count;
}

const AMOUNT_OF_NUMBERS = 5;
const POSSIBLE_NUMBERS = getPossibleNumbers();

const lotteryNumbers = getRandomNumbers();
const pickedNumbers = getPlayerNumbers();
const overlap = countNumberOverlap(lotteryNumbers, pickedNumbers);

console.log({
    lotteryNumbers,
    pickedNumbers,
    overlap,
});
