import {
    cardImg,
} from './variables';

let game = (function() {

    function resetPrevGame() {
        let imgs = document.getElementsByClassName(cardImg);
        // Looks like it can be optimize
        while(imgs.length) {
            imgs[0].remove();
        }
    }

    const startGame = () => {
        // reset prev game
        resetPrevGame();
    }

    return {
        startGame
    }
})();

export default game;