import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import Roster from './components/Roster';
import PlayerModal from './components/PlayerModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PlayerJumbo from './components/PlayerJumbo';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser);
  }
  render (){
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar/>
          <Container>
            <PlayerModal/>
            <Roster className="roster"/>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
