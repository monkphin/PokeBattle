//----------------------------------------- Global Vars
let cards = [];
let activeCard;


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
  cardPicker()
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
 * This calls on the presentData function to allow for quick/easy HTML gen
 * without the need to contain entire blocks within back-tics. 
 */

function displayPlayerName() {
  let playerName = retrievePlayerName();
  const welcomeMessage = document.getElementById('welcome_message');
  const welcomePlayer = presentData('h1',`Welcome to PokeBattle ${playerName}`);
  welcomeMessage.appendChild(welcomePlayer);
  const friendlyMessage = presentData('p', 'Good luck with your game!');
  welcomeMessage.appendChild(friendlyMessage);
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
  const cardName = [
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
  const cardImage = [
    'assets/images/cards/bulbasaur.webp', 'assets/images/cards/charmander.webp', 'assets/images/cards/squirtle.webp', 'assets/images/cards/caterpie.webp', 'assets/images/cards/weedle.webp',
    'assets/images/cards/pidgey.webp', 'assets/images/cards/rattata.webp', 'assets/images/cards/spearow.webp', 'assets/images/cards/ekans.webp', 'assets/images/cards/pikachu.webp',
    'assets/images/cards/sandshrew.webp', 'assets/images/cards/nidoran-f.webp', 'assets/images/cards/clefairy.webp', 'assets/images/cards/vulpix.webp', 'assets/images/cards/jigglypuff.webp',
    'assets/images/cards/zubat.webp', 'assets/images/cards/oddish.webp', 'assets/images/cards/paras.webp', 'assets/images/cards/venonat.webp', 'assets/images/cards/diglett.webp',
    'assets/images/cards/meowth.webp', 'assets/images/cards/psyduck.webp', 'assets/images/cards/mankey.webp', 'assets/images/cards/growlithe.webp', 'assets/images/cards/poliwag.webp',
    'assets/images/cards/abra.webp', 'assets/images/cards/machop.webp', 'assets/images/cards/bellsprout.webp', 'assets/images/cards/tentacool.webp', 'assets/images/cards/geodude.webp',
    'assets/images/cards/ponyta.webp', 'assets/images/cards/slowpoke.webp', 'assets/images/cards/magnemite.webp', 'assets/images/cards/farfetchd.webp', 'assets/images/cards/doduo.webp',
    'assets/images/cards/seel.webp', 'assets/images/cards/grimer.webp', 'assets/images/cards/shellder.webp', 'assets/images/cards/gastly.webp', 'assets/images/cards/onix.webp',
    'assets/images/cards/drowzee.webp', 'assets/images/cards/krabby.webp', 'assets/images/cards/voltorb.webp', 'assets/images/cards/exeggcute.webp', 'assets/images/cards/cubone.webp',
    'assets/images/cards/hitmonlee.webp', 'assets/images/cards/lickitung.webp', 'assets/images/cards/koffing.webp'
  ];


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

/**
 *pulls the topmost card from each deck for presentation.
 */
function cardPicker() {
  activeCard = createDecks();
  showCard(activeCard.playerDeck[0], 'player');
  showCard(activeCard.opponentDeck[0], 'opponent');
}



//-----------------------------------------Front End presentation 
/**
 * Re-usable function to simplify adding JS created data to the HTML. 
 * This can be called and have the element and content passed to it, 
 * which it will then return as the needed HTML. 
 * Concept taken from additional studying via a Skillshare JS course
 */
function presentData(elementName, elementContent) {
  const element = document.createElement(elementName);
  const content = document.createTextNode(elementContent);
  element.appendChild(content);
  return element;
}

function showCard(card, player) {
  if(player === 'player') {
    console.log('players card:', card)

    const playerCard = document.getElementById('player_card');
    const playerCardName = presentData('h3', card.name);
    const playerUl = document.createElement('ul');
    const playerCardAttack = presentData('li', card.stats.attack);
    const playerCardDefense = presentData('li', card.stats.defense);
    const playerCardSpecialAttack = presentData('li', card.stats.specialAttack);
    const playerCardSpecialDefense = presentData('li', card.stats.specialDefense);

    const playerCardImg = document.createElement('img');
    playerCardImg.src = card.image;
    
    playerCard.appendChild(playerCardName);
  
    playerUl.appendChild(playerCardAttack);
    playerUl.appendChild(playerCardDefense);
    playerUl. appendChild(playerCardSpecialAttack);
    playerUl.appendChild(playerCardSpecialDefense);
    playerCard.appendChild(playerUl);
    playerCard.appendChild(playerCardImg);
    
  } else {
    console.log('opponents card:', card)

    const opponentCard = document.getElementById('player_card');
    const opponentCardName = presentData('h3', card.name);
    const opponentUl = document.createElement('ul');
    const opponentCardAttack = presentData('li', card.stats.attack);
    const opponentCardDefense = presentData('li', card.stats.defense);
    const opponentCardSpecialAttack = presentData('li', card.stats.specialAttack);
    const opponentCardSpecialDefense = presentData('li', card.stats.specialDefense);

    const opponentCardImg = document.createElement('img');
    opponentCardImg.src = card.image;
    
    opponentCard.appendChild(opponentCardName);
  
    opponentUl.appendChild(opponentCardAttack);
    opponentUl.appendChild(opponentCardDefense);
    opponentUl. appendChild(opponentCardSpecialAttack);
    opponentUl.appendChild(opponentCardSpecialDefense);
    opponentCard.appendChild(opponentUl);
    opponentCard.appendChild(opponentCardImg);
  }
}

//-----------------------------------------Game Loops


//-----------------------------------------Messaging 


//-----------------------------------------Stats


//-----------------------------------------Testing Stuff
//----------Name handling Test 
// let playerName = retrievePlayerName()
// console.log(playerName);

//----------Card object creation testing
// cards = cardInit()
// console.log(cards);
//----------Testing card shuffle function - needs to have cardInit() above uncommented. 
// let shuffledCards = shuffleCards(cards); // Using a copy to avoid in-place modification for testing
// console.log("Shuffled cards:", shuffledCards);
//----------Deck creation testing - should generate an array with both players decks
//  let player = createDecks(playerDeck)
//  console.log(player);
//----------Testing pulling a single card - can filter for properties, eg .name, .image etc
  // let singleCard = cards[0]; 
  // console.log("Single card:", singleCard.name);
  // console.log("Single card:", singleCard.image);
  // console.log("Single card:", singleCard.stats.attack);
  // console.log("Single card:", singleCard.stats.defense);
  // console.log("Single card:", singleCard.stats.specialAttack);
  // console.log("Single card:", singleCard.stats.specialDefense);
//----------Card picker testing
// activeCard = createDecks();
// console.log(activeCard.playerDeck[0]);

