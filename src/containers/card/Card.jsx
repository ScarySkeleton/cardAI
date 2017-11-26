import React, { Component } from 'react';

import './card.scss';
import * as logic from '../../logic/logic';
import store from '../../services/store/index';

class Card extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
         logic.dragable();
    }

    getGreater(el1, el2) {
        return logic.getWeight(el1) > logic.getWeight(el2) ? 1 : -1;
    }

    render() {
        return (
            <div className='container card'>
                {
                    this.props.cards.sort((a,b) => {
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
