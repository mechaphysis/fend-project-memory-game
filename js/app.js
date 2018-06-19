//Create a timer for the game:
let hours = 0;
let minutes = 0;
let seconds = 0;

/*Simple padding function for displaying numbers in time format (two digit)
From: https://stackoverflow.com/questions/6312993/
*/
function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

// Define a variable to store the HTML where the timer is for further modifying it with JS
let timer = document.querySelector(".timer");

// This function gathers the timer running, it adds with each iteration in seconds and hold two conditionals to add up minutes and hours
function timerFunction() {
  timer.innerText =leftPad(hours,2)+":"+leftPad(minutes,2)+":"+leftPad(seconds,2);
  seconds++
  if (seconds == 60){
  minutes ++;
  seconds = 0;
  if (minutes == 60) {
  hours ++;
  minutes = 0;
  }
  }
}

//Start the timer
let intervalTimer = setInterval(timerFunction, 1000);

/*
 * Create a list that holds all of your cards
 */

let deck = document.querySelector('.deck');
let cards = document.getElementsByClassName('card');

// Create an array from the list of cards, in order to being able to shuffle them
let cardsArr = [...cards];

// Define reset button
let reset = document.querySelector('.restart');

// Define variables for stars and counter of movements
let stars = document.querySelector('.stars');
let counter = document.querySelector('.moves');
let count = 0;

//Define function for incrementing the counter of moves
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

// This function flips the card clicked and reveals its symbol
function toggleClass (evt) {
  evt.target.classList.toggle('show');
  evt.target.classList.toggle('open');
}
// Define a variable for storing the array of Open Cards
let openCardsList = [];

/* This function controls the behaviour of opened cards.
 * It adds the open card to an array, and checks for match in case of two cards opened.
 * If the cards match it triggers the function lockCards() - so they stay open and locked -
 * If the cards do not match it triggers the function removeCards():
 *  -> refer to the definition of removeCards() for explicit explanation
 */
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

/*  Functionality for decreasing Star Rating:
 *  With switch statements we select different cases.
 *  When move counter reaches 10, it trigger the first case and decreases 1 one star, by changing its class.
 *  When move counter reaches 20, it triggers the second case and decreases another star, again by changing its class.
 */
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

/* This function is triggered when the two cards in the open list match.
 * It adds to them the class ".match" that makes them stay revealed and locked (you cannot flip them back again)
 */
function lockCards () {
  openCardsList[0].classList.add('match');
  openCardsList[1].classList.add('match');
  openCardsList = [];
};

/* This function restores the opened cards to its original state
 * it flips them back by removing the open and show classes
 * And, it restores the OpenCardsList array to being empty
 */
function removeCards () {
  setTimeout(function(){
  openCardsList[0].classList.remove('show','open');
  openCardsList[1].classList.remove('show','open');
  openCardsList = [];}, 500);
};

/* This function restarts the game when the user clicks the reset button
 * The explicit functionality is detailed below with each line:
 */
function restartGame() {
  console.log('click en reset');
  //Hidding all cards again
  [...deck.children].forEach(function(el){el.classList.remove('match','open','show')});
  //Reseting moves
  counter.innerText = 0;
  //Reseting timer
  clearInterval(intervalTimer);
  hours,minutes,seconds = 0;
  intervalTimer = setInterval(timerFunction, 1000);
  //Reseting starRating
  [...stars.getElementsByClassName('fa')].forEach(function(el){el.classList.remove('fa-star-o')});
  [...stars.getElementsByClassName('fa')].forEach(function(el){el.classList.add('fa-star')});
  //Shuffling cards again
  shuffledCards = shuffle(cardsArr);
  shuffledCards.forEach(function(element){
      deck.appendChild(element);
  });
}

// Define variables for matched count so we can track how many matches the user has and also a variable for the modal popup
let matchedCount = 0;
let modalPopup = document.querySelector('.popup');

/* This function makes the modal pop up appear when all cards are matched.
 * It also modifies its HTML to show the user final stats
 */
function matched() {
  modalPopup.style.visibility = "visible";
  document.querySelector('.timeStat').innerHTML=timer.innerHTML;
  document.querySelector('.starStat').innerHTML=stars.innerHTML;
  document.querySelector('.moveStat').innerHTML=counter.innerHTML + " Moves";
 };

// event listener for user clicks:
deck.addEventListener('click',function (evt) {
// if the click is in a card (not in the deck arround cards) it triggers the following functions:
  if (evt.target != deck) {
    toggleClass(evt);
    openCards(evt);
    starRating();
    // if all cards are matched it triggers the following:
    if (matchedCount == 16) {
      //This stops the timer:
      clearInterval(intervalTimer);
      //This function calls for the popup display and shows the final stats for the player
      matched()
    }
  }
});

// Event listener for restarting the game when the user clicks the reset button
reset.addEventListener('click',function(){
  restartGame();
});

// Define variable for storing the Try Again button in the Modal Popup
let tryAgain = document.querySelector('.tryAgain');

// Event listener for the Try Again button. It removes the popup from visibility and restarts the game
tryAgain.addEventListener('click',function(){
  modalPopup.style.display="none";
  restartGame();
})
