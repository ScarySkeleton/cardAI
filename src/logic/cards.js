import { importAll } from './Utils';

export const cardsShow = (function() {
    let cards = importAll();
    cards =  cards.map(el => {
        return {
            path: el,
            name: getName(getFullInfo(el))
        }
    })
    return cards;
});

export const cardsSemantic = (function() {
    /*
        C - clubs - xpect; d - diamonds - buba; h - hearts - cerdechko; s - spades - pika;
    */
    const cardsArr = [];
    cardsShow().forEach(function(element) {
        const card = {};
        const path = element.path;
        const nameAndSuit = getFullInfo(path);

        card.name = getName(nameAndSuit);
        card.suit = getSuit(nameAndSuit);
        card.weight = getWeight(card.name);
        cardsArr.push(card);
    });

    return cardsArr;
});

function getFullInfo(element) {
    const split = element.split('_');
    return split[0].slice(element.indexOf('/') + 1, element.indexOf('_')) + split[split.length - 1].slice(0, 1);
}
function getName(full) {
    return full.slice(0, name.length - 1);
}
function getSuit(full) {
    return full.slice(full.length - 1);
}
export function getWeight(name) {
    let weight = name;
    if(isNaN(weight)) {
        return getMuzzleWeight(findMuzzles(weight));
    }
    
    return +weight;
}
function findMuzzles(name) {
    let muz;
    muzzles_weight.forEach(muzzle => {
        if(muzzle.name === name) {
            muz =  muzzle;
            return;
        }
    })
    return muz;
}
function getMuzzleWeight(muzzle) {
    return +muzzle.weight;
}

const muzzles_weight = [
    {
        name: 'jack',
        weight: 11,
    }, 
    {
        name: 'queen',
        weight: 12,
    },
    {
        name: 'king',
        weight: 13,
    },
    {
        name: 'ace',
        weight: 14,
    }
];

// Козырь
export const trump_weight = 10;