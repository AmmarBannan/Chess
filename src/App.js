import logo from './logo.svg';
import './App.css';

import {Header} from './Header.js'
import {Main} from './Main.js'

import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App() {
  
  // Store.addNotification({
  //   title: "Wonderful!",
  //   message: "teodosii@react-notifications-component",
  //   type: "success",
  //   insert: "top",
  //   container: "top-right",
  //   animationIn: ["animate__animated", "animate__fadeIn"],
  //   animationOut: ["animate__animated", "animate__fadeOut"],
  //   dismiss: {
  //     duration: 5000,
  //     onScreen: true
  //   }
  // });

  return (
    <div className="App">
      {/* <ReactNotifications /> */}
      <Header />
      <Main />
    </div>
  );
}

export default App;
