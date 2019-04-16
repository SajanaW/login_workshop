import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDkGJLFc9r_DwdMQq_aNZCzUFBBR33mNcw",
    authDomain: "impact-experience-cssg.firebaseapp.com",
    databaseURL: "https://impact-experience-cssg.firebaseio.com",
    projectId: "impact-experience-cssg",
    storageBucket: "impact-experience-cssg.appspot.com",
    messagingSenderId: "364971926657"
};

var init = () => {
    firebase.initializeApp(config);
};


ReactDOM.render(
<div>
    {init()}
    <BrowserRouter>
        <App />
    </BrowserRouter>
</div>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

