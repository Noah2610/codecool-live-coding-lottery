# Lottery App
## Idea
- buy ticket
- user picks their own numbers
- lottery generates random numbers
- check for winning ticket:
  - primary winner: all numbers match
  - consolation: at least 3 numbers match
  - joker: numbers match and are in same order as lottery numbers

---

### Constants
__N__ = set of possible lottery numbers (example: 1-50)
__M__ = amount of numbers to be picked by player and lottery

### Lottery numbers
- set of __N possible numbers__ to pick
- __players pick M numbers__ from set N
- __lottery picks M numbers__ from set N
- player who's __M picked numbers match lottery's M numbers__  
  in any order, __wins the jackpot!__

### Playing the lottery
- each player has a __balance__ (wallet)
- to play, player must purchase an __entry ticket__
- with entry, player __picks M numbers__ from set N

### Jackpot
- jackpot increases with each player entry ticket

## Odds
N = [1; 50]
M = 6
odds = 15,890,699.999 : 1

N = [1; 20]
M = 4
odds = 4845 : 1
