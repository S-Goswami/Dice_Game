/* Variables */
let score0, score1, currentPlayer, totalTurnsCount, winner;

function initializeNewGame () {
  score0 = 0;
  score1 = 0;
  currentPlayer = 0;
  totalTurnsCount = 10;
  document.getElementById("score-0").innerHTML = 0;
  document.getElementById("score-1").innerHTML = 0;
  document.getElementById("turn-0").innerHTML = 5;
  document.getElementById("turn-1").innerHTML = 5;
  document.querySelector(".player-area-0").classList.add('active');
  document.querySelector(".player-area-1").classList.remove('active');
  document.querySelector('.btn-roll-dice').disabled = false;
  winner ? document.querySelector(winner).querySelector('.winner-label').classList.remove('win') : null;
  document.querySelectorAll('.winner-label').forEach(function (x){
    x.style.visibility = 'hidden';
    })
}

initializeNewGame();

function rollDice () {
  if(totalTurnsCount) {
  document.querySelector('.btn-roll-dice').disabled = true;
    let randomNumber = Math.floor((Math.random() * 6) + 1);
    if(currentPlayer){
      score1 = score1 + randomNumber;
    } else {
      score0 = score0 + randomNumber;
    }
    document.querySelector('#score-' + currentPlayer).classList.remove('startRipple');
    document.querySelector('.die-list-' + currentPlayer).classList.toggle('odd-roll');
    document.querySelector('.die-list-' + currentPlayer).classList.toggle('even-roll');
    document.querySelector('.die-list-' + currentPlayer).dataset.roll = randomNumber;
    document.getElementById("turn-"+currentPlayer).innerHTML = 
            Number(document.getElementById("turn-"+currentPlayer).innerHTML) - 1; 
    
    setTimeout((currentPlayer) => {
      document.querySelector('#score-' + currentPlayer).classList.add('startRipple');      
      document.getElementById("score-"+currentPlayer).innerHTML = currentPlayer ? score1: score0;
      document.querySelector('.player-area-' + currentPlayer).classList.remove('active');
      document.querySelector('.player-area-' + (currentPlayer ? '0' : '1')).classList.add('active');
      document.querySelector('.btn-roll-dice').disabled = false;
      if(!totalTurnsCount){
        declareWinner();
      }
    }, 1200, currentPlayer, score1, score0);
    currentPlayer = currentPlayer ? 0 : 1;
    totalTurnsCount--;
    
    console.log(randomNumber);
  }

}
function declareWinner(){
  winner = score0 > score1 ? ".player-area-0" : ".player-area-1";
  document.querySelector(winner).querySelector('.winner-label').classList.add('win');
  document.querySelector(winner).querySelector('.winner-label').style.visibility = 'visible';
  document.querySelector('.btn-roll-dice').disabled = true;

}