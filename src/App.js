import React, { Component } from "react";
import axios from "axios";
import { Route } from 'react-router-dom';

import BookList from './components/BookList';
import Users from './components/Users';

class App extends Component {
  state = {
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Route exact path="/books" component={BookList}/>
        <Route exact path="/users" component={Users}/>
      </div>
    );
  }
}

export default App;
