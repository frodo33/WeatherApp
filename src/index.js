import React from 'react';
import ReactDOM from 'react-dom';
// import firebase from 'firebase';
import './App.scss'
import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import * as serviceWorker from './serviceWorker';


import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Europe from './components/Europe';
import Australia from './components/Australia';
import NorthAmerica from "./components/NorthAmerica";
import SouthAmerica from "./components/SouthAmerica";
import Africa from "./components/Africa";
import Asia from "./components/Asia";
// import Forecast from "./components/Forecast";


// var config = {
//     apiKey: "AIzaSyCF7yfseUxmzjns27mPB7tgdkdG0PVu6QE",
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
            <Footer />
        </div>
    </HashRouter>,
    document.getElementById('root'));

serviceWorker.unregister();
