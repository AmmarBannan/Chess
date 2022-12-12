import logo from './logo.svg';
import './App.css';

import {Header} from './Header.js'
import ChessGame from './main/ChessGame'

import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App() {

  return (
    <div className="App">
      <Header />
      <ChessGame />
    </div>
  );
}

export default App;
