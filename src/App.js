import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.css'


//import 'react-bulma-notification/css/index.css';
import * as firebase from 'firebase'
import db from './firebase'
import { Link } from 'react-router-dom';
import {PrincipalPage} from "./components/pages/PrincipalPage"
import {Notification} from "./components/states/Notification"
import {AdminPage} from "./components/adminState/adminComponents/pages/AdminPage"
import {ClientPage} from "./components/clientState/clientComponents/pages/ClientPage"


//import { FirebaseConfig } from "../config/keys";
/*firebase.initializeApp({
    apiKey: "AIzaSyDt4TUicjnEGLqpDpHdCVRdCAHcxF7IWbE",
    authDomain: "visitore-cli.firebaseapp.com",
    databaseURL: "https://visitore-cli.firebaseio.com",
    projectId: "visitore-cli",
    storageBucket: "visitore-cli.appspot.com",
    messagingSenderId: "768269165399"
  });*/

class App extends Component {
  constructor(){
    super()
    this.state = {}
    this.state.notification = null
    //this.state.notification = {type:1,message:"hola"}
    this.state.userParams=null
  }

  _updateAppState=(stateUpdated)=>{
    this.setState(stateUpdated)
  }

  _loadFormWithUserParams=()=>{
    console.log("STATE PRINCIPAL", this.state);
    switch (this.state.userParams.idUserLevel) {
      case "1":
        return(<AdminPage onUpdateAppState={this._updateAppState} appState={this.state}/>)
        break;
      case "2":
        return(<ClientPage/>)
        break;

    }
  }

  render() {
    return (
      <div className="App">
          {this.state.notification != null?
            <Notification onCloseNotification={this._updateAppState} appState={this.state} type={this.state.notification.type} message={this.state.notification.message}/>
            :
            <div></div>
          }
          {this.state.userParams == null?
            <PrincipalPage onResults={this._updateAppState} appState={this.state}/>
            :
            this._loadFormWithUserParams()
          }
      </div>
    );
  }
}

export default App;