//----------------------------------------- Global Vars
let cards = [];

//-----------------------------------------Game Start
/**
 * Check to ensure the DOM is loaded.
 * This will ensure the form is initialised to listen for events
 * various functions required for the app are also being triggered here. 
 */

document.addEventListener('DOMContentLoaded', function() {

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
 * this presents the players name retrieved from local storage. 
 */

function displayPlayerName() {
  let playerName = retrievePlayerName();
  document.getElementById('welcome_message').innerHTML += 
  `
  <h1>Welcome to PokeBattle ${playerName}</h1>
  <p>Good luck with your game!</p>
  `;
}


//-----------------------------------------Deck Constructor 

/**
 * Function to create card data using nested RNG objects for the stats 
 * and pulling the name/image from the cardInit function 
 */

function buildCard(name, image) {
  return {
    name : name,
    image : image,
    stats : {
      attack : Math.floor(Math.random() * 100),
      defense : Math.floor(Math.random() * 100),
      specialAttack : Math.floor(Math.random() * 100),
      specialDefense : Math.floor(Math.random() * 100),
      },       
  };
}

/**
 * Each card will feature a name, a card image and 4 stats. 
 * The function below will be responsible for providing the Name/image
 * from a pair of arrays. 
 */
function cardInit() {
  let cardName = [
    'Bulbasaur', 'Charmander', 'Squirtle', 'Caterpie', 'Weedle',
    'Pidgey', 'Rattata', 'Spearow', 'Ekans', 'Pikachu',
    'Sandshrew', 'Nidoran', 'Clefairy', 'Vulpix', 'Jigglypuff',
    'Zubat', 'Oddish', 'Paras', 'Venonat', 'Diglett',
    'Meowth', 'Psyduck', 'Mankey', 'Growlithe', 'Poliwag',
    'Abra', 'Machop', 'Bellsprout', 'Tentacool', 'Geodude',
    'Ponyta', 'Slowpoke', 'Magnemite', 'Farfetch\'d', 'Doduo',
    'Seel', 'Grimer', 'Shellder', 'Gastly', 'Onix',
    'Drowzee', 'Krabby', 'Voltorb', 'Exeggcute', 'Cubone',
    'Hitmonlee', 'Lickitung', 'Koffing'
  ];
  let cardImage = [
    'assets/images/pokemon/bulbasaur.webp', 'assets/images/pokemon/charmander.webp', 'assets/images/pokemon/squirtle.webp', 'assets/images/pokemon/caterpie.webp', 'assets/images/pokemon/weedle.webp',
    'assets/images/pokemon/pidgey.webp', 'assets/images/pokemon/rattata.webp', 'assets/images/pokemon/spearow.webp', 'assets/images/pokemon/ekans.webp', 'assets/images/pokemon/pikachu.webp',
    'assets/images/pokemon/sandshrew.webp', 'assets/images/pokemon/nidoran-f.webp', 'assets/images/pokemon/clefairy.webp', 'assets/images/pokemon/vulpix.webp', 'assets/images/pokemon/jigglypuff.webp',
    'assets/images/pokemon/zubat.webp', 'assets/images/pokemon/oddish.webp', 'assets/images/pokemon/paras.webp', 'assets/images/pokemon/venonat.webp', 'assets/images/pokemon/diglett.webp',
    'assets/images/pokemon/meowth.webp', 'assets/images/pokemon/psyduck.webp', 'assets/images/pokemon/mankey.webp', 'assets/images/pokemon/growlithe.webp', 'assets/images/pokemon/poliwag.webp',
    'assets/images/pokemon/abra.webp', 'assets/images/pokemon/machop.webp', 'assets/images/pokemon/bellsprout.webp', 'assets/images/pokemon/tentacool.webp', 'assets/images/pokemon/geodude.webp',
    'assets/images/pokemon/ponyta.webp', 'assets/images/pokemon/slowpoke.webp', 'assets/images/pokemon/magnemite.webp', 'assets/images/pokemon/farfetchd.webp', 'assets/images/pokemon/doduo.webp',
    'assets/images/pokemon/seel.webp', 'assets/images/pokemon/grimer.webp', 'assets/images/pokemon/shellder.webp', 'assets/images/pokemon/gastly.webp', 'assets/images/pokemon/onix.webp',
    'assets/images/pokemon/drowzee.webp', 'assets/images/pokemon/krabby.webp', 'assets/images/pokemon/voltorb.webp', 'assets/images/pokemon/exeggcute.webp', 'assets/images/pokemon/cubone.webp',
    'assets/images/pokemon/hitmonlee.webp', 'assets/images/pokemon/lickitung.webp', 'assets/images/pokemon/koffing.webp'
  ];
 let cards = [];

 //for loop to pull each name/image combo from the two arrays
 for(let i = 0; i < cardName.length; i++) {
    cards.push(buildCard(cardName[i], cardImage[i]));
 }
 return cards;
}

/**
 * Function to shuffle the deck using a Fisher-Yates algorithm 
 * function taken from this website
 * https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
 */
const shuffleCards = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };
  return array;
};

/**
 * Creates decks for both players from the previously generated card pool. 
 */
function createDecks() {
  const allCards = cardInit();
  const shuffledDeck = shuffleCards(allCards);
  const playerDeck = shuffledDeck.splice(0, 20);
  const opponentDeck = shuffledDeck.slice(0, 20);

  return {playerDeck, opponentDeck};
};

//-----------------------------------------Card Visualisation  


//-----------------------------------------Game Loops


//-----------------------------------------Messaging 


//-----------------------------------------Stats


//-----------------------------------------Testing Stuff
//----------Name handling Test 
// console.log(playerName);

//----------Card object creation testing
// cards = cardInit()
// console.log(cards);
//----------Testing card shuffle function - needs to have cardInit() above uncommented. 
// let shuffledCards = shuffleCards(cards); // Using a copy to avoid in-place modification for testing
// console.log("Shuffled cards:", shuffledCards);
//----------Deck creation testing - should generate an array with both players decks
//  let player = createDecks()
//  console.log(player);
//----------Card picker testing


 //----------Testing pulling a single card - can filter for properties, eg .name, .image etc
//  let singleCard = cards[0]; 
//  console.log("Single card:", singleCard.name);
//  console.log("Single card:", singleCard.image);
//  console.log("Single card:", singleCard.stats.attack);
//  console.log("Single card:", singleCard.stats.defense);
//  console.log("Single card:", singleCard.stats.specialAttack);
//  console.log("Single card:", singleCard.stats.specialDefense);
 
 