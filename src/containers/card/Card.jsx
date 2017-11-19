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

    componentDidMount() {
         logic.dragable();
    }

    render() {
        return (
            <div>
                {
                    this.state.cards.map((el, index) => {
                        return (
                            <div className='container card__block' key={index}>
                                <img
                                    src={require('../../img/cards' + el.slice(1))}
                                    className='card__block_img'
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
