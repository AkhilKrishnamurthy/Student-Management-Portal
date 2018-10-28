import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/main';

//class component example
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        {/* App Component Has a Child Component called Main*/}
        <Main/>
      </div>
    </BrowserRouter>
    );
    //return React.createElement('div>',{className: "App"},
  //React.createCElement('h2',null,'second line'));
  }
}

export default App;
