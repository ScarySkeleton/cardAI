import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app/App.jsx';
import store from './services/store/index';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider> ,
    document.getElementById('root')
);
