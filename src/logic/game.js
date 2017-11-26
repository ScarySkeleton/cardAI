import {
    card,
    cardImg } from './variables';
import { 
    fool } from './rule';

let game = (function() {

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

    const giveOutCards = (randomCardsIndexes, cards) => {

    }

    /*
        args: 
            1. initRule: Rule, from which every game is started
            2. gameCustomSettings: Customs settings (for example: count
                player in the game)
    */
    const setInitGameState = (initRule, gameCustomSettings = { playersCount: 1 }) => {
        const playersCount = gameCustomSettings.playersCount;
        const randomCardsIndexes = getRandomIndexOfCards(initRule.cardsCount, playersCount);
        const cards = getAllAvailableCards();
    }

    const startGame = () => {
        const withAI = fool.withAI;
        // Collect game custom settings
        const gameCustomSettings = {
            playersCount: (withAI) ? 2 : 1
        }
        
        setInitGameState(fool.init, gameCustomSettings);

        
    }

    return {
        startGame
    }
})();

export default game;