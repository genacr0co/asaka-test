import React from 'react';
import ReactDOM from 'react-dom/client';

import 'shared/styles/globals.css';
import 'shared/assets/fonts/gilroy/stylesheet.css';
import 'shared/assets/fonts/acrom/stylesheet.css';

import {App} from './app/App';

import reportWebVitals from './reportWebVitals';

import Store from "./shared/lib/store";
import {Context} from "./shared/lib/context";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = new Store();

root.render(<React.StrictMode>
    <Context.Provider value={{store}}>
        <App/>
    </Context.Provider>
</React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
