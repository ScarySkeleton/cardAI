import {
    card,
    cardImg,
    gameFieldAIDesk,
    gameFieldHumanDesk } from './variables';
import { 
    fool } from './rule';
import {
    generateClassFromName,
    getCountOfObjProp } from './Utils';

let game = (function() {

    // For curr game data 
    let game = {};

    const chooseTheGame = () => {
        return fool;
    }

    // Set val to the global game state
    const setToGameState = (key, val) => {
        game[key] = val;
    }

    const updateGameState = (newState) => {
        if(game === newState) {
            return;
        }

        game = newState;
    }

    // Also, there we create AI, that participate in game
    const getAIDesk = () => {
        const aiDeskElem = document.getElementsByClassName(gameFieldAIDesk)[0];
        return {
            desk: aiDeskElem
        }
    }

    // Also there we create humens, that playing in game
    const getHumansDesk = () => {
        const humans = {};

        const humansDeskElements = document.getElementsByClassName(gameFieldHumanDesk);
        let humenDeskElementsCount = humansDeskElements.length;

        let i = 0;

        while(i < humenDeskElementsCount) {
            humans[i] = {
                desk: humansDeskElements[i]
            };
            i += 1;
        }

        return humans;
    }

    const getPlayersDesk = () => {
        console.log(game);

        if(game.playing.withAI && game.ai) {
            game.ai = getAIDesk();
        }
        
        game.humans = getHumansDesk();

        console.log(game);
    }

    const getAllAvailableCards = () => {
        const cards = {};

        const cardsArr = document.getElementsByClassName(cardImg);
        const cardsCount = cardsArr.length;
        // Can be optimize
        for(let i = 0; i < cardsCount; i += 1) {
            cards[i] = cardsArr[i];
        }

        return cards;
    }

    const getRandomIndexOfCards = (initCardsCount, playersCount) => {
        const randomNumbers = [];
        const neededCountOfRandomNumber = initCardsCount * playersCount;
        // Minus one, because we have array of cards that start from 0 index
        const cardsInGame = (game.cards) ? getCountOfObjProp(game.cards) - 1  : getCountOfObjProp(getAllAvailableCards()) - 1;

        let i = 0;
        while(i < neededCountOfRandomNumber) {
            const randomNumber = Math.round(Math.random() * cardsInGame);
            if(!randomNumbers.includes(randomNumber)) {
                randomNumbers.push(randomNumber);
                i += 1;
            }
        }

        return randomNumbers;
    }

    const giveOutCardsForAI = (cardsIndexes) => {
        const cards = game.cards;
        const len = cardsIndexes.length;
        for(let i = 0; i < len; i += 1) {
            // Might can be optimize
            game.ai.desk.appendChild(cards[cardsIndexes[i]]);
        };
    }

    const giveOutCardsForHuman = (cardsIndexes, humanNumber = 0) => {
        if(cardsIndexes.length !== game.playing.init.cardsCount) {
            giveOutCardsForHuman(cardsIndexes.splice(0, game.playing.init.cardsCount), ++humanNumber);
        }
        const cards = game.cards;
        cardsIndexes.forEach(element => {
            // Might can be optimize
            game.humans[humanNumber].desk.appendChild(cards[element]);
        });
    }

    const giveOutCards = cardsIndexes => {
        const countOfCardsForEach = game.playing.init.cardsCount;
        if(game.ai) {
            giveOutCardsForAI(cardsIndexes.splice(0, countOfCardsForEach));
        }
        giveOutCardsForHuman(cardsIndexes);
    }

    /*
        args: 
            1. initRule: Rule, from which every game is started
            2. gameCustomSettings: Customs settings (for example: count
                player in the game)
    */
    const setInitGameState = (initRule = game.playing.init, gameCustomSettings = game.customSettings) => {
        const playersCount = gameCustomSettings.playersCount;

        const cards = getAllAvailableCards();
        // Set cards to game state
        setToGameState("cards", cards);

        const randomCardsIndexes = getRandomIndexOfCards(initRule.cardsCount, playersCount);
        
        getPlayersDesk();
        giveOutCards(randomCardsIndexes);
    }

    const startGame = () => {
        console.clear();
        // Reset prev game data
        game = {};
        // Choose the game
        setToGameState("playing", chooseTheGame());

        // Collect game custom settings
        const gameCustomSettings = {
            playersCount: 1
        }
        setToGameState("customSettings", gameCustomSettings);
        
        // Create humans object
        setToGameState("humans", {});

        // Check if we are playing with AI 
        const withAI = game.playing.withAI;
        if(withAI) {
            // IF we are playing with AI - need to increment the 
            // count of players
            updateGameState(Object.assign({}, game, {
                customSettings: {
                    playersCount: game.customSettings.playersCount + 1
                }
            }));
            // Create AI object
            setToGameState("ai", {});
        }        
        
        setInitGameState();   
    }

    const endGame = () => {

    }

    return {
        startGame,
        endGame
    }
})();

export default game;
