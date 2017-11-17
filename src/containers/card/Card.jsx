import React, { PureComponent } from 'react';

import './card.scss';
import { cards } from '../../logic/cards';
import * as logic from '../../logic/logic';

class Card extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cards: cards()
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.cards.map((el, index) => {
                        return <img
                            src={require('../../img/cards' + el.slice(1))}
                            className='card'
                            key={index}
                            alt="CARD" />
                    })
                }
            </div>
        )
    }
}

export default Card;
