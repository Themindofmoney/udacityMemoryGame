let cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener('click', openCard));

let firstPick = true;
let secondPick = false;
let boardIsLocked = false;
let cardOne;
let cardTwo;

function openCard() {
  if (boardIsLocked) return;
  if (this === cardOne) return;
   
  this.classList.add('open');


  if (!secondPick) {
    secondPick = true;
    cardOne = this;
    return;
  }

  cardTwo = this;
  boardIsLocked = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = cardOne.dataset.name === cardTwo.dataset.name;
  isMatch ? matchTrue() : matchFalse();
}

let matchCounter = 0;
function matchTrue() {
  cardOne.classList.add("match");
  cardOne.removeEventListener('click', openCard);
  cardTwo.classList.add("match");
  cardTwo.removeEventListener('click', openCard);
  matchCounter++;
  if (matchCounter === 8){
        return displayCongrats();
}
  nextMove();
}

function matchFalse() {
  setTimeout(() => {
    cardOne.classList.remove('open');
    cardTwo.classList.remove('open');

    nextMove();
  }, 1500);
}

// Moves/Stars/& nextMove function
let stars = document.querySelectorAll('.fa-star');
let starsList = document.querySelectorAll('.stars li');
let moves = 0;
document.getElementById("moves").innerHTML = "Moves:" + moves;

function nextMove() {
  moves++;
  document.getElementById("moves").innerHTML = "Moves:" + moves;
  firstPick = true;
  secondPick = false;
  boardIsLocked = false;
  cardOne = null;
  cardTwo = null;
  if (moves > 8 && moves < 12){
    for( i= 0; i < 3; i++){
        if(i > 1){
            stars[i].style.visibility = "collapse";
        }
    }
 }
 else if (moves > 13){
    for( i= 0; i < 3; i++){
        if(i > 0){
            stars[i].style.visibility = "collapse";
        }
    }
 }
}

//shuffle function
(function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.ceil(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();


//timer
let h2 = document.getElementsByTagName('h2')[0],
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    t = setTimeout(add, 1000);

}

timer();




//modal

function displayCongrats() {
  clearTimeout(t);
  const popup = document.getElementById('modal-container');
  popup.classList.remove('hide');
  let finalTime = h2.innerHTML;
  let starRating = document.querySelector('.stars').innerHTML;
    document.getElementsByClassName('final-moves')[0].innerHTML = moves;
    document.getElementsByClassName('star-rating')[0].innerHTML = starRating;
    document.getElementsByClassName('total-time')[0].innerHTML = finalTime;
}
