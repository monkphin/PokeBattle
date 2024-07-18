//----------------------------------------- Global Vars



//-----------------------------------------Game Start
/**
 * Check to ensure the DOM is loaded.
 * This will ensure the form is initialised to listen for events
 * various functions required for the app are also being triggered here. 
 */

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('welcomeMessage')) {
    titleName();
  }

  const form = document.getElementById('name_form');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  };
  displayPlayerName();
});

//-----------------------------------------Player Information 



function handleSubmit(e) {
  e.preventDefault();
  let name = document.getElementById('player_name').value;
  
  //check to ensure name has been entered
  if(name) {
    storePlayerName(name);
    window.location.assign('game.html');
  } else {
    alert('Please enter your name before continuing');
  }
};
  
  /**
   * 
   * The below functions store and retrain the player name, using localstorage.
   *  https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   */
function storePlayerName(name) {
  localStorage.setItem('playerName', name);
};
  
function retrievePlayerName() {
  let playerName = localStorage.getItem('playerName');
  return playerName;
}
  
/** 
 * Throws a welcome message to the game.html page when loaded
 * this present sthe players name retrieved from local storage. 
 */

function displayPlayerName() {
  let playerName = retrievePlayerName();
  document.getElementById('welcome_message').innerHTML += 
  `
  <h1>Welcome to PokeBattle ${playerName}</h1>
  <p>Good luck with your game!</p>
  `;
}


//-----------------------------------------Deck information 


//-----------------------------------------Game State


//-----------------------------------------Messaging 


//-----------------------------------------Stats


//-----------------------------------------Testing Stuff
//Name handling 
// console.log(playerName);




