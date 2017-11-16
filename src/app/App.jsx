import React, { PureComponent } from 'react';

import * as logic from '../logic/logic';

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cards: logic.cards_arr
        }
    }
    render() {
        console.log(this.state);
        const path = '../img/cards';
        return (
            <div>
                {
                    this.state.cards.map((el, index) => {
                        console.log(path + el.slice(1));
                        return <img src={require('../img/cards' + el.slice(1))} key={index} alt="CARD" />
                    })
                }
            </div>
        )
    }
}

export default App;
