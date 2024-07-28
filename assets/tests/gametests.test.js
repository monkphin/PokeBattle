const { storePlayerName, retrievePlayerName } = require('../js/javascript.js');
const { buildCard } = require('../js/javascript.js');

beforeAll(() => {
  jest.spyOn(window.sessionStorage.__proto__, 'setItem');
  jest.spyOn(window.sessionStorage.__proto__, 'getItem');
  jest.spyOn(window.sessionStorage.__proto__, 'clear');
});

//storePlayerName Test 
describe('Player Name Storage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test('should store player name in sessionStorage', () => {
    const playerName = 'Ash';
    storePlayerName(playerName);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('playerName', playerName);
  });

  test('should retrieve player name from sessionStorage', () => {
    const playerName = 'Ash';
    sessionStorage.setItem('playerName', playerName);

    const retrievedName = retrievePlayerName();
    expect(retrievedName).toBe(playerName);
  });

  test('should redirect to index.html if no player name is stored', () => {
    const assignMock = jest.fn();
    delete window.location;
    window.location = { assign: assignMock };

    retrievePlayerName();
    expect(assignMock).toHaveBeenCalledWith('index.html');
  });
});

//buildCard function Test

describe('buildCard', () => {
  test('should create a card with name, image, and stats', () => {
    const name = 'Pikachu';
    const image = 'pikachu.png';
    const card = buildCard(name, image);

    expect(card).toHaveProperty('name', name);
    expect(card).toHaveProperty('image', image);
    expect(card).toHaveProperty('stats');
    expect(card.stats).toHaveProperty('attack');
    expect(card.stats).toHaveProperty('defense');
    expect(card.stats).toHaveProperty('special');
    expect(card.stats).toHaveProperty('speed');
  });

  test('stats should be random numbers between 1 and 10', () => {
    const card = buildCard('Pikachu', 'pikachu.png');

    expect(card.stats.attack).toBeGreaterThanOrEqual(1);
    expect(card.stats.attack).toBeLessThanOrEqual(10);
    expect(card.stats.defense).toBeGreaterThanOrEqual(1);
    expect(card.stats.defense).toBeLessThanOrEqual(10);
    expect(card.stats.special).toBeGreaterThanOrEqual(1);
    expect(card.stats.special).toBeLessThanOrEqual(10);
    expect(card.stats.speed).toBeGreaterThanOrEqual(1);
    expect(card.stats.speed).toBeLessThanOrEqual(10);
  });
});
