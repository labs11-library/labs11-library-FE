import React, { Component } from "react";
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
        <p>Book maps <span role="img" aria-label="books">📚</span><span role="img" aria-label="map">🗺</span></p>/p>
        <Route exact path="/books" component={BookList}/>
        <Route exact path="/users" component={Users}/>
      </div>
    );
  }
}

export default App;
