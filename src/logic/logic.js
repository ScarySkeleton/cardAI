import { 
    cardsSemantic,
    cardsShow,
    // userful
    getWeight } from './cards';
import dragableCards from './cards-draggable';

/*
    Cards
*/
export const cards = cardsShow;
export const semantic = cardsSemantic;
// userful
export { getWeight };

// dragable
export const dragable = dragableCards;