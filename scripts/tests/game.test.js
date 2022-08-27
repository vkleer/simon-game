/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns } = require('../game');

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContents);
    document.close();
});

describe('game object contains correct keys', () => {
    test('score key exists', () => {
        expect('score' in game).toBe(true);
    });
    test('currentGame key exists', () => {
        expect('currentGame' in game).toBe(true);
    });
    test('playerMoves key exists', () => {
        expect('playerMoves' in game).toBe(true);
    });
    test('choices key exists', () => {
        expect('choices' in game).toBe(true);
    });
    test('choices key contains correct ids', () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4']);
    });
    test('turnNumber key exists', () => {
        expect('turnNumber' in game).toBe(true);
    });
});

describe('newGame works correctly', () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ['button1', 'button2'];
        game.currentGame = ['button1', 'button2'];
        document.getElementById('score').innerText = '42';
        newGame();
    });
    test('Should set game score to zero', () => {
        expect(game.score).toEqual(0);
    });
    test('Should clear playerMoves array', () => {
        expect(game.playerMoves).toEqual([]);
    });
    test('Should be one move in the currentGame array', () => {
        expect(game.currentGame.length).toBe(1);
    });
    test('Should display 0 for the element with id of score', () => {
        expect(document.getElementById('score').innerText).toEqual(0);
    });
});

describe('Gameplay works correctly', () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test('addTurn adds a new turn to the game', () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test('Should add correct class to light up the buttons', () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light');
    });
    test('showTurns should update game.turnNumber', () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
});