// Part 2: Deck of Cards
// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

// Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

// Once you have both cards, console.log the values and suits of both cards.

// Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

const baseURL = 'http://deckofcardsapi.com/api/deck'

// 1.
$.getJSON(`${baseURL}/new/draw/`, {count:1})
    .then(res => {console.log(`${res.cards[0].value} of ${res.cards[0].suit}`)})
    .catch(err => {console.log(err)})

// 2.
let firstCard = ''
$.getJSON(`${baseURL}/new/draw/`, {count:1})
    .then(res => {
        firstCard = `${res.cards[0].value} of ${res.cards[0].suit}`
        return $.getJSON(`${baseURL}/${res.deck_id}/draw/`, {count:1})
    })
    .then(res => {
        let secondCard = `${res.cards[0].value} of ${res.cards[0].suit}`
        console.log(firstCard, secondCard)
    })
    .catch(err => {console.log(err)})

// // 3.
let deckId = ''
$submit = $('#submit')
$list = $('#cards-drawn-list')

$.getJSON(`${baseURL}/new/shuffle/`)
    .then(res => {
        deckId = res.deck_id
        $submit.show()
  })

const drawCard = (e) => {
    e.preventDefault()
    $.getJSON(`${baseURL}/${deckId}/draw/`, {count:1})
        .then(res => {
            if (res.error) { 
                $submit.hide()
            }
            else {
                console.log(res)
                $list.append(`<li>${res.cards[0].value} of ${res.cards[0].suit}</li>`)
            }
        })
        .catch(err => {console.log(err)})
}

$submit.on('click', drawCard)
