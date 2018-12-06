import React from 'react';
import ReactDOM from 'react-dom';
// import firebase from 'firebase';
import './App.scss'
import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import * as serviceWorker from './serviceWorker';


import Header from './components/Header';
import Home from './components/Home';
import Europe from './components/Europe';
import Australia from './components/Australia';
import NorthAmerica from "./components/NorthAmerica";
import SouthAmerica from "./components/SouthAmerica";
import Africa from "./components/Africa";
import Asia from "./components/Asia";


// var config = {
//     apiKey: `${fbKey}`,
//     authDomain: "weather-60729.firebaseapp.com",
//     databaseURL: "https://weather-60729.firebaseio.com",
//     projectId: "weather-60729",
//     storageBucket: "weather-60729.appspot.com",
//     messagingSenderId: "446964294054"
// };
// firebase.initializeApp(config);


ReactDOM.render(
    <HashRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/europe' component={Europe} />
                <Route path='/australia' component={Australia} />
                <Route path='/northamerica' component={NorthAmerica} />
                <Route path='/southamerica' component={SouthAmerica} />
                <Route path='/africa' component={Africa} />
                <Route path='/asia' component={Asia} />
            </Switch>
        </div>
    </HashRouter>,
    document.getElementById('root'));

serviceWorker.unregister();
