//-----------------------------------------Game Start
/**
 * Check to ensure the DOM is loaded.
 * This will ensure that the index.html and game.html are fully initialised. 
 * Also checks for the name_form element on the index page and sets up for submission
 * Function checks for the URL of the page and will only trigger functions if we're on
 * the game.html page.
 */
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('name_form');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  };
  
  renderLogo();

    const currentURL = window.location.href;
    if (currentURL.includes('game.html')) {
        displayPlayerName();
        setPermElements();
        cardPicker();
    } 
});

/**
 * Single function to determine if the screen size is small.
 * @returns {boolean} - True if screen size is small, false otherwise.
 */
function isSmallScreen() {
  return window.innerWidth < 576;
}

/**
 * Logo size is set by screen width, so that it will always look correct irrespective of screen size. 
 * This also wraps the logo in A tags to ensure it is clickable to send the player back to the home page. 
 */
function renderLogo() {
  const logoHeader = document.getElementById('logo-header');
  if (!logoHeader) return;

  const logoURL = document.createElement('a');  
  logoURL.href = 'index.html';
  logoURL.rel = 'nooperner';

  const logoImg = document.createElement('img');
  logoImg.alt = 'PokeBattler Logo';

  if (isSmallScreen()) {

    logoImg.src = 'assets/images/pokebattler-logo.webp';
  } else {
    logoImg.src = 'assets/images/pokebattler-logo-large.webp';
  }

  // Clear any existing logos and add the new one
  logoHeader.innerHTML = '';
  logoURL.appendChild(logoImg)
  logoHeader.appendChild(logoURL);
}

/**
 * Global variables used across multiple functions.
 * playerTurn - Bool to make sure that the player can't interact with the game when it's the opponent turn. 
 * endOfGame - Bool to signal the end of the game.
 * cards - Array that makes up the game deck.
 * numberOfWins, numberOfLosses, numberOfDraws - these track the count of wins, losses, and draws.
 * turnTimer, opponentTimer, messageTimer: Timers for allowing timers to be called and cleared at the end of the game to prevent reloading. 
 * outputMessage, deckSizeArea: HTML elements for rendering messages, win/loss area, and deck size area.
 */

let playerTurn = true;
let endOfGame = false;
let cards = [];
let numberOfWins = 0;
let numberOfLosses = 0;
let numberOfDraws = 0;
let turnTimer;
let opponentTimer;
let messageTimer;
const outputMessage = document.getElementById('message-area');
const deckSizeArea = document.getElementById('deck-size-area');


/**
 * Arrays of images for large or small screens. 
 */

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
    'assets/images/small_cards/abra.webp', 'assets/images/small_cards/machop.webp', 'assets/images/small_cards/bellsprout.webp', 'assets/images/small_cards/tentacool.webp', 'assets/images/small_cards/geodude.webp',
    'assets/images/small_cards/ponyta.webp', 'assets/images/small_cards/slowpoke.webp', 'assets/images/small_cards/magnemite.webp', 'assets/images/small_cards/farfetchd.webp', 'assets/images/small_cards/doduo.webp',
    'assets/images/small_cards/seel.webp', 'assets/images/small_cards/grimer.webp', 'assets/images/small_cards/shellder.webp', 'assets/images/small_cards/ghastly.webp', 'assets/images/small_cards/onix.webp',
    'assets/images/small_cards/drowzee.webp', 'assets/images/small_cards/krabby.webp', 'assets/images/small_cards/voltorb.webp', 'assets/images/small_cards/exeggcute.webp', 'assets/images/small_cards/cubone.webp',
    'assets/images/small_cards/hitmonlee.webp', 'assets/images/small_cards/lickitung.webp', 'assets/images/small_cards/koffing.webp',   
];

/**
 * Renders default none-card text content, which is present at the start of the game
*/

function setPermElements() {
  const playerCardCount = presentData('div', 'Player deck size: ');
  playerCardCount.className = 'col-sm-3 player-deck-text';
  deckSizeArea.appendChild(playerCardCount);
  const playerDeckSize = document.createElement('div');
  playerDeckSize.id = 'player-deck-size';
  playerDeckSize.className = 'col-sm-3 player-deck-num';
  deckSizeArea.appendChild(playerDeckSize);
  
  const opponentCardCount = presentData('div', 'Opponent deck size: ');
  opponentCardCount.className = 'col-sm-3 opponent-deck-text';
  deckSizeArea.appendChild(opponentCardCount);
  const opponentDeckSize = document.createElement('div');
  opponentDeckSize.id = 'opponent-deck-size';
  opponentDeckSize.className = 'col-sm-3 opponent-deck-num';
  deckSizeArea.appendChild(opponentDeckSize);
};

//-----------------------------------------Player Information 
  
/**
 * Handles form submission for index.html, storing the players name via the 
 * storePlayerName function before redirecting to the game page. 
 * This pops an alert if the player fails to enter their name. 
 *  @param {Event} e - The form submit event.
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
 * Stores the players name using sessionStorage  
 * Found issues with localStorage when using Github pages. So moved to sessionStorage
 * https://stackoverflow.com/questions/56508930/localstorage-breaks-github-page
 */
function storePlayerName(name) {
  sessionStorage.setItem('playerName', name);
};
    
/**
 * Retrieves players name from sessionStorage.
 * @returns {string} - Player name. 
 */
function retrievePlayerName() {
  let playerName = sessionStorage.getItem('playerName');
  return playerName;
};
    

/** 
 * Throws a welcome message to game.html page when loaded
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
 * Creates card data as an object with a  name, image, and randomised stats.  
 * @param {string} name - card name 
 * @param {string} image - the image for the card.  
 * @returns {Object} - the cards object. 
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

/**
 * Provides the relevant image array dependant on screen size. 
 * @returns {Array} - array of image paths. 
 */

function cardImageSize() {
  if (isSmallScreen()) {
    return smallScreenImages;
  } else {
    return largeScreenImages;
  };
};

/**
 * Initialises the card deck with names and images
 * @returns {Array} - array of cards. 
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
 * Shuffles the deck using a Fisher-Yates algorithm 
 * function taken from this website
 * https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
 * @param {Array} array - the array to shuffle.
 * @returns {Array} - the shuffled deck
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
 * @returns {Object} - Object containing the playerDeck and OpponentDeck
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
  updateDeckCount();
};
  
//-----------------------------------------Front End presentation 

/**
 * Reusable function to return a HTML element with content. 
 * @param {string} elementName - the type of HTML element.  
 * @param {string} elementContent - the content of the element.  
 * @returns {HTMLElement} - the created element. 
 */
function presentData(elementName, elementContent) {
  const element = document.createElement(elementName);
  const content = document.createTextNode(elementContent);
  element.appendChild(content);
  return element;
};
  
/** 
 * Present both players cards to HTML using the cardRender function 
 * @param {Object} card - the card to display
 * @param {string} player - which player the card is for. 
 */
function showCard(card, player) {
  if(player === 'player') {
    cardRender('player-card', card);
  } else {
    cardRender('opponent-card', card);
  };
};
  
/**
 * Renders the cards image, name and stats. 
 * @param {string} elementId - the ID of the element we want to render the card in. 
 * @param {Object} card - the card to render. 
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

  // Remove hover/pressed classes from stat items
  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach(item => {
    item.classList.remove('stat-item-hover', 'stat-item-active');
  });
}

/**
 * Creates a bootstrap grid which serves to list the cardstats. ALso attaches an event listener for user interaction.
 * @param {string} statName - the name of hte stat. 
 * @param {number} statValue - the value of the stat. 
 * @param {string} elementId - the ID of the element
 * @returns {HTMLElement} - the created stat item. 
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

  // Add hover effect
  cardListWrapper.addEventListener('mouseenter', function() {
    if (playerTurn) {
      cardListWrapper.classList.add('stat-item-hover');
    }
  });

  cardListWrapper.addEventListener('mouseleave', function() {
    cardListWrapper.classList.remove('stat-item-hover');
  });

  // Add click event listener only if it's the player's turn
  cardListWrapper.addEventListener('click', function() {
    if (playerTurn) {
      // Add active class
      cardListWrapper.classList.add('stat-item-active');
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
 * Handles the selection of the stat and sends to resolveRound to handle round resolution. 
 * @param {string} statName - The name of the selected stat.  
 * @param {null} statValue - the value of the selected stat. 
 * @param {string} elementId - the ID of the element. 
 */
function statSelection(statName, statValue, elementId) {
  playerStatName = statName;
  playerStatValue = statValue;
  opponentStatValue = (activeCard.opponentDeck[0].stats[statName]);
  resolveRound(playerStatValue, opponentStatValue, elementId);
}

/**
 * Resolves the round - this compares the player and opponent stats
 * updates the win/loss/draw counter and displays the outcome of the round. 
 * Added a delay to show the opponent card to make things look more organic
 *  using https://stackoverflow.com/questions/17883692/how-to-set-time-delay-in-javascript
 * @param {number} playerStatValue - the players selected stat value
 * @param {number} opponentStatValue - the comparable opponent stat value
 * @param {string} elementId - the ID of the element. 
 */
function resolveRound(playerStatValue, opponentStatValue, elementId) {
  const statName = playerStatName;

  if (playerStatValue > opponentStatValue) {
    if (endOfGame) return;
    outcomeHandler(activeCard.playerDeck, activeCard.opponentDeck, null, 'Congratulations, you win this round', statName, playerStatValue, opponentStatValue);
    winLossCounter('player'); 
    playerTurn = true;
  } else if (playerStatValue < opponentStatValue)  {
    outcomeHandler(activeCard.opponentDeck, activeCard.playerDeck, null, 'Unlucky, you lost the round', statName, playerStatValue, opponentStatValue);
    winLossCounter('opponent');
    playerTurn = false;
    let opponentTimer = setTimeout(function() {
      opponentTurn()}, 3500);
  } else if (playerStatValue === opponentStatValue && elementId === 'player-card') {
    outcomeHandler(activeCard.playerDeck, activeCard.opponentDeck, 'draw', 'It\'s a draw, take another turn!', statName, playerStatValue, opponentStatValue);
    winLossCounter('draw')
    playerTurn = true;
  } else {
    outcomeHandler(activeCard.playerDeck, activeCard.opponentDeck, 'draw', 'It\'s a draw, the Enemy Trainer gets another go', statName, playerStatValue, opponentStatValue);
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
  }, 3500);
  checkEndGame()
}

/**
 * Checks if the game has ended by checking if either deck is 0.
 */
function checkEndGame() {
  if (activeCard.playerDeck.length === 0) {
    endGame('Opponent');
  } else if (activeCard.opponentDeck.length === 0) {
    endGame('Player');
  }
};
  
/**
 * Ends the game and shows the final result. Along with number of turns won/lost/drawn
 * @param {string} winner - the winner of the game. 
 */
function endGame(winner) {
  endOfGame = true;
  let playerName = retrievePlayerName();
  let newGameButton = document.createElement('button')
  newGameButton.textContent = 'Play again!';
  newGameButton.addEventListener('click', function() {
    outputMessage.innerHTML = '';
    deckSizeArea.innerHTML = '';
    numberOfWins = 0;
    numberOfLosses = 0;
    numberOfDraws = 0;
    setPermElements();
    cardPicker();
    endOfGame = false;
  });

  outputMessage.innerHTML = '';
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
  // found this https://www.codecademy.com/resources/docs/javascript/window/clearTimeout which gave the idea to clear timers due to functions continuing after game end
  clearTimeout(turnTimer);
  clearTimeout(opponentTimer);
  clearTimeout(opponentTimer);
};
  
/**
 * Handles the opponents turn by randomly picking a stat to resolve via resolveRound used the below
 * for guidance on this. 
 * https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object 
 */

function opponentTurn() {
  if (endOfGame) return;
  const statNames = ['attack', 'defense', 'special', 'speed'];
  const randomStat = statNames[Math.floor(Math.random() * statNames.length)];
  const pickedStatValue = activeCard.opponentDeck[0].stats[randomStat];
  const showStats = document.querySelector('#opponent-card .card-stats');
  if (showStats) {
    showStats.classList.remove('hidden');
  }
  let playerEquivStat = activeCard.playerDeck[0].stats[randomStat];
  const selectionMessage = presentData('h3', `The enemy trainer picked ${randomStat} which has the value ${pickedStatValue} vs your stat ${randomStat} which has the value ${playerEquivStat}`);
  outputMessage.innerHTML = '';
  outputMessage.appendChild(selectionMessage);

  let turnTimer = setTimeout(function() {
    resolveRound(playerEquivStat, pickedStatValue, 'opponent-card');
    playerTurn = true;
  }, 3500);
}

/**
 * Handles the outcome of the round by moving cards between the decks depending on the outcome and updating deck counts. 
 * @param {Array} winnerDeck - the winning players deck
 * @param {Array} loserDeck - the losing players deck. 
 * @param {string} outcome - the outcome of the round 
 * @param {string} message - the message to show the player based on the outcome. 
 * @param {string} statName - the name of the selected stat.
 * @param {number} playerStatValue - the value of the selected stat for the player.
 * @param {number} opponentStatValue - the value of the selected stat for the opponent.

 */
function outcomeHandler(winnerDeck, loserDeck, outcome, message, statName, playerStatValue, opponentStatValue) {
  const winMessage = presentData('h3', message);
  outputMessage.innerHTML = '';
  if (playerTurn) {
    const selectedStatMessage = presentData('p', `You selected ${statName} with the value ${playerStatValue}, vs the enemy trainers ${statName} which has the value ${opponentStatValue}`);
    selectedStatMessage.id = 'stat-message';
    outputMessage.appendChild(selectedStatMessage);
  } 
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
}

/**
 * updates the dusplayed deck counts for each player
 */
function updateDeckCount() {
  const playerDeckSizeElement = document.getElementById('player-deck-size');
  const opponentDeckSizeElement = document.getElementById('opponent-deck-size');
  
  playerDeckSizeElement.textContent = activeCard.playerDeck.length;
  opponentDeckSizeElement.textContent = activeCard.opponentDeck.length;
}

  
/**
 * Updates the win/loss/draw counters to reflect round outcome. 
 * @param {string} winner - the rounds winner.  
 * @returns {number, number, number} nunmberOfWins, numberOfLosses, numberOFDraws - the number of wins/losses/draws. 
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


/**
 * Breifly displays a message to the player to show outcomes. 
 * @param {string} message - the message to display. 
 */
function displayMessage(message) {
    const messageArea = document.getElementById('message-area');
    messageArea.textContent = message;
    messageArea.style.display = 'block';
    
    let messageTimer = setTimeout(() => {
        messageArea.style.display = 'none';
    }, 3500); // Clear the message after 2 seconds
}