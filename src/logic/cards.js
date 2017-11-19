import { importAll } from './Utils';

export const cards = (function() {
    return importAll();
});

export const cardsSemantic = (function() {
    /*
        C - clubs - xpect; d - diamonds - buba; h - hearts - cerdechko; s - spades - pika;
    */
    const cardsArr = [];
    cards().forEach(function(element) {
        const card = {};
        const nameAndSuit = getFullInfo(element);

        card.name = getName(nameAndSuit);
        card.suit = getSuit(nameAndSuit);
        card.weight = getWeight(card.name);
        cardsArr.push(card);
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
    function getWeight(name) {
        let weight = name;
        if(isNaN(weight)) {
            muzzles_weight.forEach((muzzles) => {
                if(muzzles.name === weight) {
                    weight = muzzles.weight;
                    return +weight;
                }
            })
        }
        
        return +weight;
    }
});

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