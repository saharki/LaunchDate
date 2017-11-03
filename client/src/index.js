import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './reducer';

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

const Main = () => (
    <Provider store={store}>
        <MuiThemeProvider>
             <div className="main" >
                 <App />
             </div>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
