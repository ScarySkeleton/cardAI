import React, { PureComponent } from 'react';

import './field.scss';
import Card from '../card/Card.jsx';

class Field extends PureComponent {
    constructor(props) {
        super(props);
    }

    startPlay() {
        console.log("HERE");
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
                    <div className='field__desk-pc'>
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
                    <Card />
                </div>
            </div>
        )
    }
}

export default Field;
