//Create a timer for the game:
let hours = 0;
let minutes = 0;
let seconds = 0;
setInterval(function(){
console.log("The time is: "+hours+":"+minutes+":"+seconds)
seconds++
if (seconds == 60){
minutes ++;
seconds = 0;
if (minutes == 60) {
hours ++;
minutes = 0;
}
}
 }, 1000);

/*
 * Create a list that holds all of your cards
 */
 let deck = document.querySelector('.deck');
let cards = document.getElementsByClassName('card');
// Create an array from the list of cards, in order to being able to shuffle them
let cardsArr = [...cards];
// Define reset button
let reset = document.querySelector('.restart');
// Define stars
let stars = document.querySelector('.stars');
let counter = document.querySelector('.moves');
let count = 0;
function incremCounter(){
  count += 1;
  counter.innerText = count;
};
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
* Display the cards on the page
*   x shuffle the list of cards using the provided "shuffle" method below
*   x loop through each card and create its HTML
*   x add each card's HTML to the page
*/

// Apply the shuffle function and append each shuffled card to deck
let shuffledCards = shuffle(cardsArr);
shuffledCards.forEach(function(element){
deck.appendChild(element);
})
/*
 * set up the event listener for a card. If a card is clicked:
 *  x display the card's symbol (put this functionality in another function that you call from this one)
 *  x add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  x if the list already has another card, check to see if the two cards match
 *    x if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    x if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    x increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    x if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 function toggleClass (evt) {
 evt.target.classList.toggle('show');
 evt.target.classList.toggle('open');
 }
 let openCardsList = [];
 function openCards (evt) {
     openCardsList.push(evt.target);
     if (openCardsList.length == 2) {
         incremCounter();
         if (openCardsList[0].innerHTML === openCardsList[1].innerHTML) {
           lockCards();
           matchedCount += 2;
         } else {
           removeCards();
         };
         };
       };
// functionality for decreasing Star Rating
function starRating () {
    switch (count) {
      case 10:
        stars.getElementsByClassName('fa')[2].classList.remove('fa-star');
        stars.getElementsByClassName('fa')[2].classList.add('fa-star-o');
        break;
      case 20:
      console.log('second condition for Star Rating triggered');
      stars.getElementsByClassName('fa')[1].classList.remove('fa-star');
      stars.getElementsByClassName('fa')[1].classList.add('fa-star-o');
      break;
      default:
      console.log('This is a default case');
    }
}
 function lockCards () {
   openCardsList[0].classList.add('match');
   openCardsList[1].classList.add('match');
   openCardsList = [];
 };
 function removeCards () {
  setTimeout(function(){
  openCardsList[0].classList.remove('show','open');
  openCardsList[1].classList.remove('show','open');
  openCardsList = [];}, 500);
};
 let matchedCount = 0;
 let modalPopup = document.querySelector('.popup');
 function matched() {
   modalPopup.style.display = "block";
 };
 deck.addEventListener('click',function (evt) {
  toggleClass(evt);
  openCards(evt);
  starRating();
  if (matchedCount == 16) {
    matched()
  }
  });

reset.addEventListener('click',function(){
  console.log('click en reset');
  [...deck.children].forEach(function(el){el.classList.remove('match','open','show')});
  shuffledCards = shuffle(cardsArr);
  shuffledCards.forEach(function(element){
    deck.appendChild(element);
  });
});
