import {
    card,
    cardImg,
    gameFieldAIDesk,
    gameFieldHumanDesk } from './variables';
import { 
    fool } from './rule';
import {
    generateClassFromName } from './Utils';

let game = (function() {

    // For curr game data 
    let game = {};

    const chooseTheGame = () => {
        return fool;
    }

    // Also, there we create AI, that participate in game
    const getAIDesk = () => {
        return document.getElementsByClassName(gameFieldAIDesk)[0];
    }

    // Also there we create humens, that playing in game
    const getHumansDesk = () => {
        const humensArray = [];
        const humansDesk = document.getElementsByClassName(gameFieldHumanDesk);
        let humenDeskCount = humansDesk.length;
        let i = 0;

        while(i < humenDeskCount) {
            humensArray.push({
                desk: humansDesk[i]
            });
            i += 1;
        }

        return humensArray;
    }

    const getPlayersDesk = () => {
        if(game.game.withAI && game.AI) {
            game.AI.desk = getAIDesk();
        }

        game.Humans = getHumansDesk();
    }

    const getAllAvailableCards = () => {
        return document.getElementsByClassName(cardImg);
    }

    const getRandomIndexOfCards = (initCardsCount, playersCount) => {
        const randomNumbers = [];
        const neededCountOfRandomNumber = initCardsCount * playersCount;
        const cardsInGame = getAllAvailableCards().length;

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

    // TODO: Bug here: Sometimes we get's 5 cards, but should 6
    const giveOutCardsForAI = (cardsIndexes, cards) => {
        console.log("AI card array", cardsIndexes);
        cardsIndexes.forEach(element => {
            // Can be optimize
            game.AI.desk.appendChild(cards[element]);
        });
    }

    // TODO: Bug here: Sometimes we get's 5 cards, but should 6
    const giveOutCardsForHuman = (cardsIndexes, cards, humanNumber = 0) => {
        console.log("Human card array", cardsIndexes);
        if(cardsIndexes.length !== game.game.init.cardsCount) {
            giveOutCardsForHuman(cardsIndexes.splice(0, game.game.init.cardsCount), cards, ++humanNumber);
        }
        cardsIndexes.forEach(element => {
            // Can be optimize
            game.Humans[humanNumber].desk.appendChild(cards[element]);
        });
    }

    const giveOutCards = ({ randomCardsIndexes: cardsIndexes, cards }) => {
        const countOfCardsForEach = game.game.init.cardsCount;
        console.log(game);
        if(game.AI) {
            giveOutCardsForAI(cardsIndexes.splice(0, countOfCardsForEach), cards);
        }
        giveOutCardsForHuman(cardsIndexes, cards);
    }

    /*
        args: 
            1. initRule: Rule, from which every game is started
            2. gameCustomSettings: Customs settings (for example: count
                player in the game)
    */
    const setInitGameState = (initRule, gameCustomSettings) => {
        const playersCount = gameCustomSettings.playersCount;
        const randomCardsIndexes = getRandomIndexOfCards(initRule.cardsCount, playersCount);
        const cards = getAllAvailableCards();

        getPlayersDesk();

        giveOutCards({
            randomCardsIndexes,
            cards
        })
    }

    const startGame = () => {
        // Reset prev game data
        game = {};
        // Choose the game
        game.game = chooseTheGame();

        // Collect game custom settings
        const gameCustomSettings = {
            playersCount: 1
        }
        game.customSettings = gameCustomSettings;
        
        // Create humans object
        game.Humans = {};

        // Check if we are playing with AI 
        const withAI = game.game.withAI;
        if(withAI) {
            // IF we are playing with AI - need to increment the 
            // count of players
            game.customSettings.playersCount = game.customSettings.playersCount + 1;
            // Create AI object
            game.AI = {};
        }        
        
        setInitGameState(fool.init, game.customSettings);   
    }

    const endGame = () => {

    }

    return {
        startGame,
        endGame
    }
})();

export default game;
