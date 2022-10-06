const player1CardDisplay = document.querySelector(".player1-card-slot");
const player2CardDisplay = document.querySelector(".player2-card-slot");
const player1DeckDisplay = document.querySelector(".player1-deck");
const player2DeckDisplay = document.querySelector(".player2-deck");
const gameDisplay = document.querySelector(".text");
const drawButton = document.querySelector(".draw");
const newGameButton = document.querySelector(".new-game");

gameDisplay.innerHTML = "Click New Game to Start!";


var isTie = false;
let tieCards1 = [];
let tieCards2 = [];
let tiePot = [];

const cardValues = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};


const Player = function ({ name } = {}) {
  this.name = name;
  this.hand = [];
  this.activeCard = {};
};

const Card = function ({ suit, value }) {
  this.suit = suit;
  this.value = value;
};


const Deck = function () {
  this.cards = [];
  const suits = ["♥", "♦", "♠", "♣"];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      this.cards.push(new Card({ value: values[j], suit: suits[i] }));
    }
  }
  console.log(this.cards);
};

const Game = function () {
  this.player1 = new Player({ name: "Player1" });
  this.player2 = new Player({ name: "Player2" });

  this.deck = new Deck();
  console.log(this.deck);
};


Game.prototype.shuffle = function () {
  this.deck.cards.sort((a, b) => Math.random() - 0.5);
};

Game.prototype.deal = function () {
  for (let i = 0; i < this.deck.cards.length; i += 2) {
    this.player1.hand.push(this.deck.cards[i]);
    this.player2.hand.push(this.deck.cards[i + 1]);
  }
};

Game.prototype.flipCard = function () {
  this.player1.activeCard = this.player1.hand.pop();
  this.player2.activeCard = this.player2.hand.pop();

  console.log(this.player1.activeCard);
  console.log(this.player2.activeCard);
};

Game.prototype.updateDisplay = function () {
  player1CardDisplay.innerHTML = `${this.player1.activeCard.value}${this.player1.activeCard.suit}`;
  player2CardDisplay.innerHTML = `${this.player2.activeCard.value}${this.player2.activeCard.suit}`;
};

Game.prototype.updateDeckValue = function () {
  player1DeckDisplay.innerHTML = this.player1.hand.length;
  player2DeckDisplay.innerHTML = this.player2.hand.length;
};

Game.prototype.isWinner = function () {
  if (cardValues[this.player1.activeCard.value] > cardValues[this.player2.activeCard.value]) {
    gameDisplay.innerHTML = "Player 1 Wins!";
    this.player1.hand.unshift(this.player1.activeCard);
    this.player1.hand.unshift(this.player2.activeCard);
  } else if (
    cardValues[this.player2.activeCard.value] > cardValues[this.player1.activeCard.value]
  ) {
    gameDisplay.innerHTML = "Player 2 Wins!";
    this.player2.hand.unshift(this.player1.activeCard);
    this.player2.hand.unshift(this.player2.activeCard);
  } else if (
    cardValues[this.player1.activeCard.value] === cardValues[this.player2.activeCard.value]
  ) {
    gameDisplay.innerHTML = "WAR!";
    if (this.player1.hand.length <= 4 || this.player2.hand.length <= 4) {
      this.player1.hand.unshift(this.player1.activeCard);
      this.player2.hand.unshift(this.player2.activeCard);
    } else {
      game.tieBreak();
    }
  }

  console.log(this.player1.hand, this.player2.hand);

  if (this.player1.hand.length === 0) {
    gameDisplay.innerHTML = "Player 2 Wins Game!";
    document.getElementById("draw-button").disabled = true;
    return;
  } else if (this.player2.hand.length === 0) {
    gameDisplay.innerHTML = "Player 1 Wins Game!";
    document.getElementById("draw-button").disabled = true;
    return;
  } else if (this.player1.hand.length > 0 || this.player1.hand.length > 0) {
    return;
  }
};

Game.prototype.tieBreak = function () {
  tiePot.push(this.player1.activeCard);
  tiePot.push(this.player2.activeCard);

  tieCards1 = this.player1.hand.splice(this.player1.hand.length - 3);
  tieCards2 = this.player2.hand.splice(this.player2.hand.length - 3);

  tiePot.push(...tieCards1);
  tiePot.push(...tieCards2);

  console.log(tiePot);
  isTie = true;
};

Game.prototype.addTieWinner = function () {
  if (cardValues[this.player1.activeCard.value] > cardValues[this.player2.activeCard.value]) {
    gameDisplay.innerHTML = "Player 1 Wins the War!";
    this.player1.hand.unshift(this.player1.activeCard);
    this.player1.hand.unshift(this.player2.activeCard);
    this.player1.hand.unshift(...tiePot);
    game.clearTie();
  } else if (
    cardValues[this.player2.activeCard.value] > cardValues[this.player1.activeCard.value]
  ) {
    gameDisplay.innerHTML = "Player 2 Wins the War!";
    this.player2.hand.unshift(this.player1.activeCard);
    this.player2.hand.unshift(this.player2.activeCard);
    this.player2.hand.unshift(...tiePot);
    game.clearTie();
  } else if (
    cardValues[this.player1.activeCard.value] === cardValues[this.player2.activeCard.value]
  ) {
    gameDisplay.innerHTML = "It's a Tie!";
    game.tieBreak();
  }

  console.log(this.player1.hand, this.player2.hand);
};

Game.prototype.clearTie = function () {
  tiePot = [];
  tieCards1 = [];
  tieCards2 = [];
  isTie = false;
};

Game.prototype.startGame = function () {
  game.shuffle();
  game.deal();
  game.updateDeckValue();

  document.getElementById("draw-button").disabled = false;
};

Game.prototype.reset = function () {
  this.player1.hand = [];
  this.player2.hand = [];

  player1CardDisplay.innerHTML = "";
  player2CardDisplay.innerHTML = "";

  player1DeckDisplay.innerHTML = "";
  player2DeckDisplay.innerHTML = "";
};




const game = new Game();

console.log(game);




newGameButton.addEventListener("click", () => {
  game.reset();

  game.startGame();

  gameDisplay.innerHTML = "Draw Cards!";
});

drawButton.addEventListener("click", () => {
  if (isTie === false) {
    game.flipCard();
    game.isWinner();
    game.updateDisplay();
    game.updateDeckValue();
  } else if (isTie !== false) {
    game.flipCard();
    game.addTieWinner();
    game.updateDisplay();
    game.updateDeckValue();
  }
});

































// import Deck from "./deck.js"

// const CARD_VALUE_MAP = {
//     "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10":10, "J": 11, "Q": 12, "K": 13, "A": 14,
// }

// const player1CardSlot = document.querySelector('.player1-card-slot')
// const player2CardSlot = document.querySelector('.player2-card-slot')
// const player1DeckElement = document.querySelector('.player1-deck')
// const player2DeckElement = document.querySelector('.player2-deck')
// const drawButton = document.querySelector('.draw-button')
// const text = document.querySelector('.text')

// var isTie = false;
// let tieCards1 = [];
// let tieCards2 = [];
// let tiePot = [];

// let player1Deck, player2Deck, inRound, stop

// drawButton.addEventListener('click', () => {
//     if (stop) {
//         startGame()
//         return
//     }

//     if (inRound) {
//         cleanBeforeRound()
//     } else {
//         flipCards()
//     }
// })

// startGame()
// function startGame() {
//     let player1 = prompt("Enter player one's name:");
//     if (player1 != null) {
//         document.getElementById("player1-name").innerHTML = 'Player 1:  ' + player1;
//     }

//     let player2 = prompt("Enter player two's name: ");
//     if (player2 != null) {
//         document.getElementById("player2-name").innerHTML = 'Player 2:  ' + player2;
//     }



//     const deck = new Deck()
//     deck.shuffle()

//     const deckMidPoint = Math.ceil(deck.numberOfCards / 2)
//     player1Deck = new Deck(deck.cards.slice(0, deckMidPoint))
//     player2Deck = new Deck(deck.cards.slice(deckMidPoint, deck.numberOfCards))
//     inRound = false
//     stop = false

//     cleanBeforeRound() 
// }

// function cleanBeforeRound() {
//     inRound = false
//     player1CardSlot.innerHTML = ''
//     player2CardSlot.innerHTML = ''
//     text.innerText = ''

//     updateDeckCount()
// }

// function flipCards() {
//     inRound = true

//     const player2Card = player2Deck.pop()
//     const player1Card = player1Deck.pop()

//     player2CardSlot.appendChild(player2Card.getHTML())
//     player1CardSlot.appendChild(player1Card.getHTML())

//     updateDeckCount()

//     if (isRoundWinner(player2Card, player1Card)) {
//         text.innerText = 'Player 2 Wins'
//         player2Deck.push(player2Card)
//         player2Deck.push(player1Card)
//     } else if (isRoundWinner(player1Card, player2Card)) {
//             text.innerText = 'Player 1 Wins'
//             player1Deck.push(player2Card)
//             player1Deck.push(player1Card)
//     } else {       
//         text.innerText = 'WAR!';
//         if (player1Deck.length <= 4 || player2Deck.length <= 4) {
//             player1Deck.unshift(player1Card);
//             player2Deck.unshift(player2Card);
//         } else {
//             game.tieBreak();
//         }
          
//         // text.innerText = 'WAR!'
//         //     player1Deck.push(player1Card)
//         //     player2Deck.push(player2Card)
//     }

//     if (isGameOver(player2Deck)) {
//         text.innerText = 'Player 2 Wins!'
//         stop = true
//     } else if (isGameOver(player1Deck)) {
//         text.innerText = 'Player 1 Wins!'
//         stop = true
//     }
// }

// function updateDeckCount() {
//     player1DeckElement.innerText = player1Deck.numberOfCards
//     player2DeckElement.innerText = player2Deck.numberOfCards
// }

// function isRoundWinner(cardOne, cardTwo) {
//     return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
// }

// function isGameOver(deck) {
//     return deck.numberOfCards === 0;
// }

// // player1CardSlot.appendChild(deck.cards[0].getHTML())
// console.log(player1Deck);
// console.log(player2Deck);