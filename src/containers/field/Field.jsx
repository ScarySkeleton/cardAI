import React, { PureComponent } from 'react';

import './field.scss';
import Card from '../card/Card.jsx';

class Field extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className='container field'>
                <div className='field__desk'>
                    This is card game!
                </div>
                <div className='field__cards'>
                    <Card />
                </div>
            </div>
        )
    }
}

export default Field;
