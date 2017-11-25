import React, { PureComponent } from 'react';

import './card.scss';
import { cards, getWeight } from '../../logic/cards';
import * as logic from '../../logic/logic';

class Card extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cards: cards()
        }
    }

    componentDidMount() {
         logic.dragable();
    }

    getGreater(el1, el2) {
        return getWeight(el1) > getWeight(el2) ? 1 : -1;
    }

    render() {
        return (
            <div>
                {
                    this.state.cards.sort((a,b) => {
                        return this.getGreater(a.name, b.name);
                    }).map((el, index) => {
                        return (
                            <div className='container card__block' key={index}>
                                <img
                                    src={require('../../img/cards' + el.path.slice(1))}
                                    name={el.name}
                                    className='card__block-img'
                                    alt="smart-card-games" />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Card;
