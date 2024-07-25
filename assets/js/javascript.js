//-----------------------------------------Game Start
/**
 * Check to ensure the DOM is loaded.
 * This will ensure that the index.html and game.html are fully initialized. 
 * Also checks for the name_form element on the index page and sets up for submission
 * Function checks for the URL of the page and will only trigger functions if we're on
 * the game.html page.
 */
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('name_form');
  if (form) {
      form.addEventListener('submit', handleSubmit);
  }

  // Ensure the URL comparison works correctly
  const currentURL = window.location.href;
  if (currentURL.includes('game.html')) {
      console.log('Game page detected, initializing game functions.');
      displayPlayerName();
      setPermElements();
      cardPicker();
  } else {
      console.log('Not on the game page.');
  }
});

//-----------------------------------------Player Information 

/**
* Handles form submission for index.html, storing the player's name via the 
* storePlayerName function before redirecting to the game page. 
* This pops an alert if the player fails to enter their name. 
* @param {Event} e - The form submit event.
*/
function handleSubmit(e) {
  e.preventDefault();
  let name = document.getElementById('player_name').value;
  // Check to ensure name has been entered
  if (name) {
      storePlayerName(name);
      window.location.assign('game.html');
  } else {
      alert('Please enter your name before continuing');
  }
}

/**
* Stores the player's name using sessionStorage  
* Found issues with localStorage when using Github pages. So moved to sessionStorage
* https://stackoverflow.com/questions/56508930/localstorage-breaks-github-page
*/
function storePlayerName(name) {
  sessionStorage.setItem('playerName', name);
}

/**
* Retrieves player's name from sessionStorage.
* @returns {string} - Player name. 
*/
function retrievePlayerName() {
  return sessionStorage.getItem('playerName');
}

/** 
* Throws a welcome message to game.html page when loaded
*/
function displayPlayerName() {
  let playerName = retrievePlayerName();
  const welcomePlayer = presentData('h1', `Welcome to PokeBattle ${playerName}`);
  outputMessage.appendChild(welcomePlayer);
  const friendlyMessage = presentData('h2', 'Good luck with your game!');
  outputMessage.appendChild(friendlyMessage);
}

//-----------------------------------------Deck Constructor 

/**
* Creates card data as an object with a name, image, and randomized stats.  
* @param {string} name - card name 
* @param {string} image - the image for the card.  
* @returns {Object} - the card's object. 
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
}

/**
* Provides the relevant image array dependent on screen size. 
* @returns {Array} - array of image paths. 
*/
function cardImageSize() {
  return window.innerWidth < 576 ? smallScreenImages : largeScreenImages;
}

/**
* Initializes the card deck with names and images
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

  // Check if the arrays are of equal length
  if (cardName.length !== cardImage.length) {
      console.error('The cardInit Arrays are not an equal length.');
      return [];
  }

  for (let i = 0; i < cardName.length; i++) {
      cards.push(buildCard(cardName[i], cardImage[i]));
  }
  return cards;
}

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
      [array[i], array[j]] = [array[j], array[i]];  // Swap elements
  }
  return array;
}

/**
* Creates decks for both players from the previously generated card pool. 
* @returns {Object} - Object containing the playerDeck and OpponentDeck
*/
function createDecks() {
  const allCards = cardInit();
  const shuffledDeck = shuffleCards(allCards);
  const playerDeck = shuffledDeck.splice(0, 20);
  const opponentDeck = shuffledDeck.slice(0, 20);

  return { playerDeck, opponentDeck };
}

/**
* Pulls the topmost card from each deck for presentation.
*/
function cardPicker() {
  activeCard = createDecks();
  showCard(activeCard.playerDeck[0], 'player');
  showCard(activeCard.opponentDeck[0], 'opponent');
  updateDeckCount();
}

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
}

/** 
* Present both players' cards to HTML using the cardRender function 
* @param {Object} card - the card to display
* @param {string} player - which player the card is for. 
*/
function showCard(card, player) {
  cardRender(player === 'player' ? 'player-card' : 'opponent-card', card);
}

/**
* Renders the card's image, name and stats. 
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
  for (let stat of stats) {
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
* Creates a bootstrap grid which serves to list the card stats. Also attaches an event listener for user interaction.
* @param {string} statName - the name of the stat. 
* @param {number} statValue - the value of the stat. 
* @param {string} elementId - the ID of the element
* @returns {HTMLElement} - the created stat item. 
*/
function listCreator(statName, statValue, elementId) {
  const cardListWrapper = document.createElement('div');
  cardListWrapper.className = 'row stat-item';

  const nameSpan = document.createElement('div');
  nameSpan.className = 'stat-name';
  nameSpan.textContent = `${statName.charAt(0).toUpperCase() + statName.slice(1)}:`;

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
* @param {number} statValue - the value of the selected stat. 
* @param {string} elementId - the ID of the element. 
*/
function statSelection(statName, statValue, elementId) {
  playerStatName = statName;
  playerStatValue = statValue;
  opponentStatValue = activeCard.opponentDeck[0].stats[statName];
  resolveRound(playerStatValue, opponentStatValue, elementId);
}

/**
* Resolves the round - this compares the player and opponent stats
* updates the win/loss/draw counter and displays the outcome of the round. 
* Added a delay to show the opponent card to make things look more organic
*  using https://stackoverflow.com/questions/17883692/how-to-set-time-delay-in-javascript
* @param {number} playerStatValue - the player's selected stat value
* @param {number} opponentStatValue - the comparable opponent stat value
* @param {string} elementId - the ID of the element. 
*/
function resolveRound(playerStatValue, opponentStatValue, elementId) {
  const statName = playerStatName; // Assuming playerStatName is globally set

  if (playerStatValue > opponentStatValue) {
      if (endOfGame) return;
      outcomeHandler(activeCard.playerDeck, activeCard.opponentDeck, null, 'Congratulations, you win this round', statName, playerStatValue, opponentStatValue);
      winLossCounter('player');
      playerTurn = true;
  } else if (playerStatValue < opponentStatValue) {
      outcomeHandler(activeCard.opponentDeck, activeCard.playerDeck, null, 'Unlucky, you lost the round', statName, playerStatValue, opponentStatValue);
      winLossCounter('opponent');
      playerTurn = false;
      let opponentTimer = setTimeout(function() {
          opponentTurn()
      }, 3500);
  } else if (playerStatValue === opponentStatValue && elementId === 'player-card') {
      outcomeHandler(activeCard.playerDeck, activeCard.opponentDeck, 'draw', 'It\'s a draw, take another turn!', statName, playerStatValue, opponentStatValue);
      winLossCounter('draw')
      playerTurn = true;
  } else {
      outcomeHandler(activeCard.playerDeck, activeCard.opponentDeck, 'draw', 'It\'s a draw, the Enemy Trainer gets another go', statName, playerStatValue, opponentStatValue);
      winLossCounter('draw')
      playerTurn = false;
      let opponentTimer = setTimeout(function() {
          opponentTurn()
      }, 3500);
  }
  let turnTimer = setTimeout(function() {
      if (!endOfGame) {
          showCard(activeCard.playerDeck[0], 'player')
          showCard(activeCard.opponentDeck[0], 'opponent')
          outputMessage.innerHTML = '';
      }
  }, 2000);
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
}

/**
* Ends the game and shows the final result. Along with the number of turns won/lost/drawn
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
      const winMessage = presentData('p', `You won the game in ${totalRounds} rounds. You won ${numberOfWins} rounds, drew ${numberOfDraws} rounds, and lost ${numberOfLosses} rounds.`);
      outputMessage.appendChild(winTitle);
      outputMessage.appendChild(winMessage);
  } else {
      const lossTitle = presentData('h3', `Commiserations ${playerName}`);
      const lossMessage = presentData('p', `You lost the game in ${totalRounds} rounds. You won ${numberOfWins} rounds, drew ${numberOfDraws} rounds, and lost ${numberOfLosses} rounds.`);
      outputMessage.appendChild(lossTitle);
      outputMessage.appendChild(lossMessage);
  }
  outputMessage.appendChild(newGameButton);

  // Clear timers to prevent functions from continuing after game end
  clearTimeout(turnTimer);
  clearTimeout(opponentTimer);
}

/**
* Handles the opponent's turn by randomly picking a stat to resolve via resolveRound.
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
* @param {Array} winnerDeck - the winning player's deck
* @param {Array} loserDeck - the losing player's deck. 
* @param {string} outcome - the outcome of the round 
* @param {string} message - the message to show the player based on the outcome. 
* @param {string} statName - the name of the selected stat.
* @param {number} playerStatValue - the value of the selected stat for the player.
* @param {number} opponentStatValue - the value of the selected stat for the opponent.
*/
function outcomeHandler(winnerDeck, loserDeck, outcome, message, statName, playerStatValue, opponentStatValue) {
  const winMessage = presentData('h3', message);
  outputMessage.innerHTML = '';
  outputMessage.appendChild(winMessage);

  if (playerTurn) {
      const selectedStatMessage = presentData('p', `You selected ${statName} with the value ${playerStatValue}, vs the enemy trainer's ${statName} which has the value ${opponentStatValue}`);
      selectedStatMessage.id = 'stat-message';
      outputMessage.appendChild(selectedStatMessage);
  }

  let gainedCard = loserDeck.shift();
  let usedCard = winnerDeck.shift();

  if (outcome === 'draw') {
      winnerDeck.push(gainedCard);
      loserDeck.push(gainedCard);
  } else {
      winnerDeck.push(usedCard, gainedCard);
  }
  updateDeckCount();
}

/**
* Updates the displayed deck counts for each player
*/
function updateDeckCount() {
  const playerDeckSizeElement = document.getElementById('player-deck-size');
  const opponentDeckSizeElement = document.getElementById('opponent-deck-size');

  playerDeckSizeElement.textContent = activeCard.playerDeck.length;
  opponentDeckSizeElement.textContent = activeCard.opponentDeck.length;
}

/**
* Updates the win/loss/draw counters to reflect round outcome. 
* @param {string} winner - the round's winner.  
* @returns {number} - numberOfWins, numberOfLosses, numberOfDraws - the number of wins/losses/draws. 
*/
function winLossCounter(winner) {
  if (winner === 'player') {
      numberOfWins++;
  } else if (winner === 'opponent') {
      numberOfLosses++;
  } else {
      numberOfDraws++;
  }
  return numberOfWins, numberOfLosses, numberOfDraws;
}

/**
* Briefly displays a message to the player to show outcomes. 
* @param {string} message - the message to display. 
*/
function displayMessage(message) {
  const messageArea = document.getElementById('message-area');
  messageArea.textContent = message;
  messageArea.style.display = 'block';

  let messageTimer = setTimeout(() => {
      messageArea.style.display = 'none';
  }, 2000); // Clear the message after 2 seconds
}

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

//----------Deck creation testing - should generate an array with both players' decks
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
