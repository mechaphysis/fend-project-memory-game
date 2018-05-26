/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName('card');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  x display the card's symbol (put this functionality in another function that you call from this one)
 *  x add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  x if the list already has another card, check to see if the two cards match
 *    x |BUGGY| if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    x |BUGGY| if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    x increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 let deck = document.querySelector('.deck');
 function toggleClass (evt) {
 evt.target.classList.toggle('show');
 evt.target.classList.toggle('open');
 }
 let openCardsList = [];
 function openCards (evt) {
     openCardsList.push(evt.target);
 };
 function lockCards () {
   openCardsList[0].classList.add('match');
   openCardsList[1].classList.add('match');
   openCardsList = [];
 };
 function removeCards () {
   openCardsList[0].classList.remove('show','open');
   openCardsList[1].classList.remove('show','open');
   openCardsList = [];
 };
 let counter = document.querySelector('.moves');
 let count = 0;
 function incremCounter(){
   count += 1;
   counter.innerText = count;
 };
 let matchedCount = 0;
 function matched() {

 };
 deck.addEventListener('click',function (evt) {
  toggleClass(evt);
  openCards(evt);
  incremCounter();
  if (openCardsList.length == 2) {
      if (openCardsList[0].innerHTML == openCardsList[1].innerHTML) {
        lockCards();
        matchedCount += 2;
      } else {
        removeCards();
      };
      };
  if (matchedCount == 16) {
    matched()
  }
  });
