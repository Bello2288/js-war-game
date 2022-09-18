// const Player = function({name} = {}) {
//     this.name = name;
//     this.hand = [];
//   }
  
//   const Game = function() {
//     let player1 = prompt("Enter player one's name:");

//     let player2 = prompt("Enter player two's name: ");

//     this.player1 = document.getElementById("player1-name").innerHTML;
//     this.player2 = document.getElementById("player2-name").innerHTML;
//     // this.player1 = new Player({name: player1});
//     // this.player2 = new Player({name: player2});
  
//   }

//   const game = new Game();
  



  import Deck from "./deck.js"

const CARD_VALUE_MAP = {
    "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10":10, "J": 11, "Q": 12, "K": 13, "A": 14,
}

const player1CardSlot = document.querySelector('.player1-card-slot')
const player2CardSlot = document.querySelector('.player2-card-slot')
const player1DeckElement = document.querySelector('.player1-deck')
const player2DeckElement = document.querySelector('.player2-deck')
const drawButton = document.querySelector('.draw-button')
const text = document.querySelector('.text')

let player1Deck, player2Deck, inRound, stop

drawButton.addEventListener('click', () => {
    if (stop) {
        startGame()
        return
    }

    if (inRound) {
        cleanBeforeRound()
    } else {
        flipCards()
    }
})

startGame()
function startGame() {
    let player1 = prompt("Enter player one's name:");
    if (player1 != null) {
        document.getElementById("player1-name").innerHTML = 'Player 1:' + " " +  player1;}

    let player2 = prompt("Enter player two's name: ");
    if (player2 != null) {
        document.getElementById("player2-name").innerHTML = 'Player 2:' + " " +  player2;;}



    const deck = new Deck()
    deck.shuffle()

    const deckMidPoint = Math.ceil(deck.numberOfCards / 2)
    player1Deck = new Deck(deck.cards.slice(0, deckMidPoint))
    player2Deck = new Deck(deck.cards.slice(deckMidPoint, deck.numberOfCards))
    inRound = false
    stop = false

    cleanBeforeRound() 
}

function cleanBeforeRound() {
    inRound = false
    player1CardSlot.innerHTML = ''
    player2CardSlot.innerHTML = ''
    text.innerText = ''

    updateDeckCount()
}

function flipCards() {
    inRound = true

    const player2Card = player2Deck.pop()
    const player1Card = player1Deck.pop()

    player2CardSlot.appendChild(player2Card.getHTML())
    player1CardSlot.appendChild(player1Card.getHTML())

    updateDeckCount()

    if (isRoundWinner(player2Card, player1Card)) {
        text.innerText = 'Player 2 Wins'
        player2Deck.push(player2Card)
        player2Deck.push(player1Card)
    } else if (isRoundWinner(player1Card, player2Card)) {
            text.innerText = 'Player 1 Wins'
            player1Deck.push(player2Card)
            player1Deck.push(player1Card)
    } else {
        text.innerText = 'Draw'
            player1Deck.push(player1Card)
            player2Deck.push(player2Card)
    }

    if (isGameOver(player2Deck)) {
        text.innerText = 'Player 2 Wins!'
        stop = true
    } else if (isGameOver(player1Deck)) {
        text.innerText = 'Player 1 Wins!'
        stop = true
    }
}

function updateDeckCount() {
    player1DeckElement.innerText = player1Deck.numberOfCards
    player2DeckElement.innerText = player2Deck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function isGameOver(deck) {
    return deck.numberOfCards === 0;
}

// player1CardSlot.appendChild(deck.cards[0].getHTML())
console.log(player1Deck);
console.log(player2Deck);