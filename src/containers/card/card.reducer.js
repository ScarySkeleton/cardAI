import * as actions from './card.action';

const initState = {
    triggerChanged: false,
}

const cardReducer = (state = initState, action) => {
    switch(action.type) {
        case actions.CARD_NEED_TO_BE_CHANGED:
            let newState = {};
            newState = state;
            state = {};
            for(let key in newState) {
                if(newState.hasOwnProperty(key)) {
                    if(key === 'triggerChanged') {
                        state[key] = !newState[key]
                    } else {
                        state[key] = newState[key]
                    }
                }
            }
            return state;
        default: 
            return state;
    }
}

export default cardReducer;