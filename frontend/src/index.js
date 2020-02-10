import React from 'react';
import ReactDOM from 'react-dom';
import "tailwindcss/dist/base.css"
import "tailwindcss/dist/components.css"
import "tailwindcss/dist/utilities.css"
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
