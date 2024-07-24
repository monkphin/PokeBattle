//-----------------------------------------Game Start
/**
 * Check to ensure the DOM is loaded.
 * This will ensure the form is initialised to listen for events. 
 * Also checks for the name_form element on the index page and sets up for submission
 * various functions required for the app are also being triggered here. 
 */
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('name_form');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  };
  displayPlayerName();
  cardPicker();
  setPermElements();
});


/**
 * Several variables that are called in multiple functions - grouping these for ease of finding them
 * playerTurn is a bool to ensure that the player cannot interact with the game when its not their turn
 * cards is the array of cards that makes up the game deck. 
 * numberOfWins, numberOfLosses and numberOfDraws track the count of win, lose and draw
 * the three const's to track specific HTML elements that messages are sent to. 
 */

/**
* Several variables that are called in multiple functions - grouping these
* for clarity
*/
let playerTurn = true;
let endOfGame = false;
let cards = [];
let numberOfWins = 0;
let numberOfLosses = 0;
let numberOfDraws = 0;
let turnTimer;
let opponentTimer
const outputMessage = document.getElementById('message_area');
const winLossArea = document.getElementById('win-loss-area');
const deckSizeArea = document.getElementById('deck-size-area');

const largeScreenImages = [
    'assets/images/large_cards/bulbasaur.webp', 'assets/images/large_cards/charmander.webp', 'assets/images/large_cards/squirtle.webp', 'assets/images/large_cards/caterpie.webp', 'assets/images/large_cards/weedle.webp',
    'assets/images/large_cards/pidgey.webp', 'assets/images/large_cards/rattata.webp', 'assets/images/large_cards/spearow.webp', 'assets/images/large_cards/ekans.webp', 'assets/images/large_cards/pikachu.webp',
    'assets/images/large_cards/sandshrew.webp', 'assets/images/large_cards/nidoran.webp', 'assets/images/large_cards/clefairy.webp', 'assets/images/large_cards/vulpix.webp', 'assets/images/large_cards/jigglypuff.webp',
    'assets/images/large_cards/zubat.webp', 'assets/images/large_cards/oddish.webp', 'assets/images/large_cards/paras.webp', 'assets/images/large_cards/venonat.webp', 'assets/images/large_cards/diglett.webp',
    'assets/images/large_cards/meowth.webp', 'assets/images/large_cards/psyduck.webp', 'assets/images/large_cards/mankey.webp', 'assets/images/large_cards/growlithe.webp', 'assets/images/large_cards/poliwag.webp',
    'assets/images/large_cards/abra.webp', 'assets/images/large_cards/machop.webp', 'assets/images/large_cards/bellsprout.webp', 'assets/images/large_cards/tentacool.webp', 'assets/images/large_cards/geodude.webp',
    'assets/images/large_cards/ponyta.webp', 'assets/images/large_cards/slowpoke.webp', 'assets/images/large_cards/magnemite.webp', 'assets/images/large_cards/farfetchd.webp', 'assets/images/large_cards/doduo.webp',
    'assets/images/large_cards/seel.webp', 'assets/images/large_cards/grimer.webp', 'assets/images/large_cards/shellder.webp', 'assets/images/large_cards/ghastly.webp', 'assets/images/large_cards/onix.webp',
    'assets/images/large_cards/drowzee.webp', 'assets/images/large_cards/krabby.webp', 'assets/images/large_cards/voltorb.webp', 'assets/images/large_cards/exeggcute.webp', 'assets/images/large_cards/cubone.webp',
    'assets/images/large_cards/hitmonlee.webp', 'assets/images/large_cards/lickitung.webp', 'assets/images/large_cards/koffing.webp',
];  
  
const smallScreenImages = [
    'assets/images/small_cards/bulbasaur.webp', 'assets/images/small_cards/charmander.webp', 'assets/images/small_cards/squirtle.webp', 'assets/images/small_cards/caterpie.webp', 'assets/images/small_cards/weedle.webp', 
    'assets/images/small_cards/pidgey.webp', 'assets/images/small_cards/rattata.webp', 'assets/images/small_cards/spearow.webp', 'assets/images/small_cards/ekans.webp', 'assets/images/small_cards/pikachu.webp',
    'assets/images/small_cards/sandshrew.webp', 'assets/images/small_cards/nidoran.webp', 'assets/images/small_cards/clefairy.webp', 'assets/images/small_cards/vulpix.webp', 'assets/images/small_cards/jigglypuff.webp',
    'assets/images/small_cards/zubat.webp', 'assets/images/small_cards/oddish.webp', 'assets/images/small_cards/paras.webp', 'assets/images/small_cards/venonat.webp', 'assets/images/small_cards/diglett.webp',
    'assets/images/small_cards/meowth.webp', 'assets/images/small_cards/psyduck.webp', 'assets/images/small_cards/mankey.webp', 'assets/images/small_cards/growlithe.webp', 'assets/images/small_cards/poliwag.webp',
    'assets/images/small_cards/abra.webp', 'assets/images/small_cards/machop.webp', 'assets/images/small_cards/bellsprout.webp', 'assets/images/small_cards/tentacool.webp', 'assets/images/small_cards/geodude.avf',
    'assets/images/small_cards/ponyta.webp', 'assets/images/small_cards/slowpoke.webp', 'assets/images/small_cards/magnemite.webp', 'assets/images/small_cards/farfetchd.webp', 'assets/images/small_cards/doduo.webp',
    'assets/images/small_cards/seel.webp', 'assets/images/small_cards/grimer.webp', 'assets/images/small_cards/shellder.webp', 'assets/images/small_cards/ghastly.webp', 'assets/images/small_cards/onix.webp',
    'assets/images/small_cards/drowzee.webp', 'assets/images/small_cards/krabby.webp', 'assets/images/small_cards/voltorb.webp', 'assets/images/small_cards/exeggcute.webp', 'assets/images/small_cards/cubone.webp',
    'assets/images/small_cards/hitmonlee.webp', 'assets/images/small_cards/lickitung.webp', 'assets/images/small_cards/koffing.webp',   
];

/**
* Single function to render all default none card text content, which is
* present at the start of the game - could look into cleaning this up in the future. 
*/

function setPermElements() {
  const playerCardCount = presentData('div', 'Player deck size: ');
  playerCardCount.className = 'col-sm-3';
  deckSizeArea.appendChild(playerCardCount);
  const playerDeckSize = document.createElement('div');
  playerDeckSize.id = 'player-deck-size';
  playerDeckSize.className = 'col-sm-3';
  deckSizeArea.appendChild(playerDeckSize);
  
  const opponentCardCount = presentData('div', 'Opponent deck size: ');
  opponentCardCount.className = 'col-sm-3';
  deckSizeArea.appendChild(opponentCardCount);
  const opponentDeckSize = document.createElement('div');
  opponentDeckSize.id = 'opponent-deck-size';
  opponentDeckSize.className = 'col-sm-3';
  deckSizeArea.appendChild(opponentDeckSize);
};

//-----------------------------------------Player Information 
  
/**
* This function is used to collect the player name from the index page
* and pass to the storePlayerName function - once entered it will load
* the game.html page. 
* If the player does not enter their name, it kicks an alert requesting this
and preventing the player continuing. 
*/
function handleSubmit(e) {
  e.preventDefault();
  let name = document.getElementById('player_name').value;
  //check to ensure name has been entered
  if(name) {
    storePlayerName(name);
    window.location.assign('game.html');
  } else {
    alert('Please enter your name before continuing');
  };
};
    
/**
* The below functions store and retrain the player name, using localStorage.
*  https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
* Found issues with localStorage on Github pages, this link suggests
* that it may also cause data to persist. Shifted to sessionStorage instead
* https://stackoverflow.com/questions/56508930/localstorage-breaks-github-page
*/
function storePlayerName(name) {
  sessionStorage.setItem('playerName', name);
};
    
function retrievePlayerName() {
  let playerName = sessionStorage.getItem('playerName');
  return playerName;
};
    

/** 
* Throws a welcome message to the game.html page when loaded
* this presents the players name retrieved from local storage. 
* This calls on the presentData function to allow for quick/easy HTML gen
* without the need to contain entire blocks within back-tics. 
*/
function displayPlayerName() {
  let playerName = retrievePlayerName();
  const welcomePlayer = presentData('h1',`Welcome to PokeBattle ${playerName}`);
  outputMessage.appendChild(welcomePlayer);
  const friendlyMessage = presentData('h2', 'Good luck with your game!');
  outputMessage.appendChild(friendlyMessage);
};
  
  
//-----------------------------------------Deck Constructor 
  
/**
* Function to create card data using nested RNG objects for the stats 
* and pulling the name/image from the cardInit function 
*/
function buildCard(name, image) {
  return {
    name: name,
    image: image,
    stats: {
      attack: Math.ceil(Math.random() * 10),
      defense: Math.ceil(Math.random() * 10),
      special: Math.ceil(Math.random() * 10),
      speed: Math.ceil(Math.random() * 10),
    },
  };
};

function cardImageSize() {
  if (window.innerWidth < 576) {
    return smallScreenImages;
  } else {
    return largeScreenImages;
  };
};

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
    'Seel', 'Grimer', 'Shellder', 'Ghastly', 'Onix',
    'Drowzee', 'Krabby', 'Voltorb', 'Exeggcute', 'Cubone',
    'Hitmonlee', 'Lickitung', 'Koffing',
  ];

  const cardImage = cardImageSize();
  
  //for loop to pull each name/image combo from the two arrays
  if(cardName.length === cardImage.length) { 
    for(let i = 0; i < cardName.length; i++) {
      cards.push(buildCard(cardName[i], cardImage[i]));
    };
  } else {
    console.log('The cardInit Arrays are not an equal length.')
  }
  return cards;
};
  
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
};
  
//-----------------------------------------Front End presentation 
/**
* Re-usable function to simplify adding JS created data to the HTML. 
* This can be called and have the element and content passed to it, 
* which it will then return as the needed HTML. 
* Concept taken from additional studying via a skillshare JS course
*/
function presentData(elementName, elementContent) {
  const element = document.createElement(elementName);
  const content = document.createTextNode(elementContent);
  element.appendChild(content);
  return element;
};
  
/** 
* Present both players cards to HTML using the cardRender function 
* to keep things much simpler here. This effectively determines 
* which deck is the players - Should merge this with 
* the cardRender function, since this feels superfluous. 
*/
function showCard(card, player) {
  if(player === 'player') {
    cardRender('player-card', card);
  } else {
    cardRender('opponent-card', card);
  };
};
  
/**
* cardRender function is designed to take the element ID
* from the webpage to show each players card in its own div
* this is then passed as an argument along with the card from
* showCard, the name and image are appended as children to the 
* div, with the stats being turned into an array which is then 
* iterated through to generate the list using listCreator
*/
  
function cardRender(elementId, card) {
  if (endOfGame) return;

  const cardElement = document.getElementById(elementId);

  cardElement.innerHTML = '';

  const cardContainer = document.createElement('div');
  cardContainer.className = 'card-container';

  const cardContent = document.createElement('div');
  cardContent.className = 'card';

  const cardName = presentData('h3', card.name);
  cardName.className = 'card-name';

  const cardImg = document.createElement('img');
  cardImg.src = card.image;
  cardImg.alt = card.name + ' Pokemon card';
  cardImg.className = 'card-image';

  const statsContainer = document.createElement('div');
  statsContainer.className = 'card-stats';
  if (elementId === 'opponent-card') {
    statsContainer.classList.add('hidden');
  }

  const stats = ['attack', 'defense', 'special', 'speed'];
  for (let i = 0; i < stats.length; i++) {
    const stat = stats[i];
    const listItem = listCreator(stat, card.stats[stat], elementId);
    statsContainer.appendChild(listItem);
  }

  cardContent.appendChild(cardImg);
  cardContent.appendChild(statsContainer);

  cardContainer.appendChild(cardName);
  cardContainer.appendChild(cardContent);

  cardElement.appendChild(cardContainer);
}




  
/**
* Adding new list creator function since I need to also show statNames alongside stat numbers, 
* this will take the output of showCard and utilise the createElement function rather than 
* have the showCard function pass directly into createElement 
*/
function listCreator(statName, statValue, elementId) {
  const cardListWrapper = document.createElement('div');
  cardListWrapper.className = 'row stat-item';

  const nameSpan = document.createElement('div');
  nameSpan.className = 'stat-name';
  nameSpan.textContent = statName.charAt(0).toUpperCase() + statName.slice(1) + ':';

  const valueSpan = document.createElement('div');
  valueSpan.className = 'stat-value';
  valueSpan.textContent = statValue;

  cardListWrapper.appendChild(nameSpan);
  cardListWrapper.appendChild(valueSpan);

  const statWrapper = document.createElement('div');
  statWrapper.className = 'col-6 col-lg-12 stat-wrapper';
  statWrapper.appendChild(cardListWrapper);

  cardListWrapper.addEventListener('click', function() {
      if (playerTurn) {
          statSelection(statName, statValue, elementId);

          const showStats = document.querySelector('#opponent-card .card-stats');
          if (showStats) {
              showStats.classList.remove('hidden');
          }
      }
  });

  return statWrapper;
}
  
//-----------------------------------------Game Loops
  
/**
* Initial loop to compare selected stats and kick out a message to the player
* This takes stats from the eventListener in listCreator and does a simple
* comparison providing outcomes for each possible result.  
*/
function statSelection(statName, statValue, elementId) {
  playerStatName = statName;
  playerStatValue = statValue;
  opponentStatValue = (activeCard.opponentDeck[0].stats[statName]);
  resolveRound(playerStatValue, opponentStatValue, elementId);
};

/**
* Function compares selected player stat with the equivalent opponent stat then
* kicks a message outComeHandler to deal with displaying win/lose/draw 
* This also kicks which player won to the winLossCounter to 
* allow tracking of count of wins/losses
* added delay timer when calling show card
*  using https://stackoverflow.com/questions/17883692/how-to-set-time-delay-in-javascript
*/
function resolveRound (playerStatValue, opponentStatValue, elementId) {
  if(playerStatValue > opponentStatValue) {
    if (endOfGame) return;
    outcomeHandler(activeCard.playerDeck, activeCard.opponentDeck, null, 'Congratulations, you win this round');
    winLossCounter('player'); 
    playerTurn = true;
  } else if(playerStatValue < opponentStatValue)  {
    outcomeHandler(activeCard.opponentDeck, activeCard.playerDeck, null, 'Unlucky, you lost the round');
    winLossCounter('opponent');
    playerTurn = false;
    let opponentTimer = setTimeout(function() {
      opponentTurn()}, 3500);
  } else if(playerStatValue === opponentStatValue && elementId === 'player-card') {
    outcomeHandler(activeCard.playerDeck, activeCard.opponentDeck, 'draw', 'It\'s a draw, take another turn!');
    winLossCounter('draw')
    playerTurn = true;
  } else {
    outcomeHandler(activeCard.playerDeck, activeCard.opponentDeck, 'draw', 'It\'s a draw, the Enemy Trainer gets another go');
    winLossCounter('draw')
    playerTurn = false;
    let opponentTimer = setTimeout(function() {
        opponentTurn()}, 3500);
  };
  let turnTimer = setTimeout(function() {
    if (!endOfGame) {
      showCard(activeCard.playerDeck[0], 'player')
      showCard(activeCard.opponentDeck[0], 'opponent')
      outputMessage.innerHTML = '';
    }
  }, 2000);
  checkEndGame()
};

function checkEndGame() {
  if (activeCard.playerDeck.length === 0) {
    endGame('Opponent');
  } else if (activeCard.opponentDeck.length === 0) {
    endGame('Player');
  }
};
  
function endGame(winner) {
  endOfGame = true;
  let playerName = retrievePlayerName();
  let newGameButton = document.createElement('button')
  newGameButton.textContent = 'Play again!';
  newGameButton.addEventListener('click', function() {
    outputMessage.innerHTML = '';
    winLossArea.innerHTML = '';
    deckSizeArea.innerHTML = '';
    numberOfWins = 0;
    numberOfLosses = 0;
    numberOfDraws = 0;
    setPermElements();
    cardPicker();
    endOfGame = false;
  });

  outputMessage.innerHTML = '';
  winLossArea.innerHTML = '';
  deckSizeArea.innerHTML = '';
  let totalRounds = numberOfDraws + numberOfLosses + numberOfWins;
  if (winner === 'Player') {
    const winTitle = presentData('h3', `Congratulations ${playerName}`);
    const winMessage = presentData('p', `You won the game in ${totalRounds}. 
    You won ${numberOfWins} rounds, drew ${numberOfDraws} rounds and lost ${numberOfLosses}`)
    outputMessage.appendChild(winTitle);
    outputMessage.appendChild(winMessage);
  } else {
    const lossTitle = presentData('h3', `Commiserations ${playerName}`)
    const lossMessage = presentData('p', `You lost the game in ${totalRounds}. 
    You won ${numberOfWins} rounds, drew ${numberOfDraws} rounds and lost ${numberOfLosses}`)
    //Add button element to play again. 
    outputMessage.appendChild(lossTitle);
    outputMessage.appendChild(lossMessage);
  };
  outputMessage.appendChild(newGameButton);
  // found this https://www.codecademy.com/resources/docs/javascript/window/clearTimeout which gave ideas to clear timers due to functions continuing after game end
  clearTimeout(turnTimer);
  clearTimeout(opponentTimer);
};
  
/**
* Struggled with this, but realised I may be able to use a similar approach to 
* that  used in cardRender function to help - had issues breaking out stat names and stats. 
* before hand - found this stack overflow page which helped with random picking, realised I could 
* use the results of this to check against the stats in activeCard.opponentDeck.stats
* https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object 
*/
function opponentTurn() {
  if (endOfGame) return;
  const statNames = ['attack', 'defense', 'special', 'speed']
  const randomStat = statNames[Math.floor(Math.random() * statNames.length)];
  const pickedStatValue = activeCard.opponentDeck[0].stats[randomStat];
  const showStats = document.querySelector('#opponentcard .card-stats')
  if (showStats) {
    showStats.classList.remove('hidden');
  };
  const selectionMessage = presentData('h3', `The enemy trainer picked ${randomStat} which has the value ${pickedStatValue}`);
  outputMessage.innerHTML = '';
  outputMessage.appendChild(selectionMessage);

  let turnTimer = setTimeout(function()  {
    resolveRound(activeCard.playerDeck[0].stats[randomStat], pickedStatValue);
    playerTurn = true;
  }, 3500);
};
  
/**
* Outcome handler moves the current card to either the player or opponent
* depending on who won, this also moves the currently active card of the winner
* to the back of their deck, forcing a new card to be used. This then calls 
* updateDeckCount to show how big each players deck is 
*/
function outcomeHandler(winnerDeck, loserDeck, outcome, message) {
  const winMessage = presentData('h3', message);
  outputMessage.innerHTML = '';
  outputMessage.appendChild(winMessage);

  let gainedCard = loserDeck.shift();
  let usedCard = winnerDeck.shift();

  if (outcome === 'draw') {
    winnerDeck.push(gainedCard);
    loserDeck.push(gainedCard);
  } else {
    winnerDeck.push(usedCard, gainedCard);
  };
  updateDeckCount();
};

/**
* updateDeckCount simply takes a count of each players deck and throws it
* to the webpage allowing the player to know what the current state of 
* play is regarding the deck sizes. 
*/
function updateDeckCount() {
  const playerDeckSizeElement = document.getElementById('player-deck-size');
  const opponentDeckSizeElement = document.getElementById('opponent-deck-size');
  
  playerDeckSizeElement.textContent = activeCard.playerDeck.length;
  opponentDeckSizeElement.textContent = activeCard.opponentDeck.length;

};
  
/**
 *  winLossCounter takes the outcome of resolve round, this then checks
 * if the winner was the player or the opponent and increments the score 
 * on the webpage. 
 */
function winLossCounter(winner) {
  if (winner === 'player') {
    numberOfWins++;
  } else if (winner === 'opponent') {
    numberOfLosses++;
  } else {
    numberOfDraws++;
  };    
 return numberOfWins, numberOfLosses, numberOfDraws;
};

function displayMessage(message) {
    const messageArea = document.getElementById('message_area');
    messageArea.textContent = message;
    messageArea.style.display = 'block';
    
    setTimeout(() => {
        messageArea.style.display = 'none';
    }, 2000); // Clear the message after 2 seconds
}
  
/**
* -----------------------------------------------------------------------------------TO DO 
* Game Over
* Add CSS Classes to any Elements that lack them
* mouse over interactions for stat selection
*/
  
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
// let player = playerDeck)
// console.log(player);
//----------Testing pulling a single card - can filter for properties, eg .name, .image etc
// let singleCard = cards[0]; 
// console.log("Single card:", singleCard.name);
// console.log("Single card:", singleCard.image);
// console.log("Single card:", singleCard.stats.attack);
// console.log("Single card:", singleCard.stats.defense);
// console.log("Single card:", singleCard.stats.special);
// console.log("Single card:", singleCard.stats.speed);
//----------Card picker testing
// activeCard = createDecks();
// console.log(activeCard.playerDeck[0]);
