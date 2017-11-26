import React, { PureComponent } from 'react';

import './field.scss';
import {
    card,
    cardImg
} from '../../logic/variables';
import Card from '../card/Card.jsx';
import * as logic from '../../logic/logic';

class Field extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            id: Math.random(),
            cards: logic.cards(),
        }
        this.startPlay = this.startPlay.bind(this);
    }

    componentDidMount() {
        this.startGame();
    }

    startPlay() {
        // remove 
        this.removeAllCards();        
        this.clearInitImg();

        setTimeout(() => {
            this.setState({
                id: Math.random(),
                cards: logic.cards(),
            })

            this.startGame();
        }, 0);

        
    }

    clearInitImg() {
        this.setState({
            cards: [],
        })
    }

    removeAllCards() {
        // remove all other img
        let imgs = document.getElementsByClassName(cardImg);
        // Looks like it can be optimize
        while(imgs.length) {
            imgs[0].remove();
        }
    }

    startGame() {
        logic.game.startGame();
    }

    render() {
        return (
            <div className='container field'>
                <div className='field__desk'>
                    This is card game!
                    <div className='field__desk-action'>
                        <button onClick={this.startPlay}>
                            Start play
                        </button>
                    </div>
                    <div className='field__desk-ai'>
                    </div>
                    <div className='field__desk-game'>
                        <div className='field__current'>
                        </div>
                        <div className='field__hangUp'>
                        </div>
                    </div>
                    <div className='field__desk-human'>
                    </div>
                </div>

                <div className='field__cards'>
                    <Card id={this.state.id} cards={this.state.cards} />
                </div>
            </div>
        )
    }
}

export default Field;
