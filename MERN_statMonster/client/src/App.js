import React from 'react';
import AppNavbar from './components/AppNavbar';
import Roster from './components/Roster';
import PlayerModal from './components/PlayerModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PlayerJumbo from './components/PlayerJumbo';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar></AppNavbar>
        <Container>
          <PlayerModal/>
          <Roster className="roster"/>
          {/* <PlayerJumbo className="col-7 playerJumbo"/> */}
        </Container>
      </div>
    </Provider>
  );
}

export default App;
