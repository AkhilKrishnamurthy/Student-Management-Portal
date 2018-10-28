import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './login/login';
import Home from './home/home';
import userReport from './userReport/userReport';

class Main extends Component {
    render() {
        return(
            <div>
            <Route path="/login" component={Login}/>
            <Route path="/home" component={Home}/>
            <Route path="/userReport" component={userReport}/>
            </div>
        )
    }
}

export default Main;