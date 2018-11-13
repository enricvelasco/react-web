import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.scss';
import './App.css';
import 'w3-css/w3.css';
import 'bulma/css/bulma.css'
import 'react-color-picker/index.css'


//import 'react-bulma-notification/css/index.css';
import * as firebase from 'firebase'
import db from './firebase'
import { Link } from 'react-router-dom';
import {PrincipalPage} from "./components/pages/PrincipalPage"
import {Notification} from "./components/states/Notification"
import {AdminPage} from "./components/adminState/adminComponents/pages/AdminPage"
import {StorePage} from "./components/adminState/adminComponents/pages/StorePage"
import {AssociationPage} from "./components/adminState/adminComponents/pages/AssociationPage"
import {ClientPage} from "./components/clientState/clientComponents/pages/ClientPage"
import {ImageBackground} from "./components/adminState/adminComponents/components/ImageBackground"
import {NavBarAdmin} from "./components/adminState/adminComponents/components/NavBarAdmin"
import {StartPage} from "./components/adminState/adminComponents/components/startPage/StartPage"
import {Footer} from "./components/adminState/adminComponents/components/Footer"




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
    switch (this.state.userParams.usersLevel.id) {
      case "H9poGCqWdlF9UdMZd3WE"://admin ROOT
        return(<AdminPage onUpdateAppState={this._updateAppState} appState={this.state}/>)
      case "nFELvYL5cYeuXwez9qys"://asociacion ADMIN
        return(<AssociationPage onUpdateAppState={this._updateAppState} appState={this.state}/>)
      case "aGRHtQc98BazJeFpCiD9"://asociacion empleado
          return(<AssociationPage onUpdateAppState={this._updateAppState} appState={this.state}/>)
      case "DVNySnHN1mjDKKQ7srwq"://tienda admin
          return(<StorePage onUpdateAppState={this._updateAppState} appState={this.state}/>)
      case "4jnemon4i4qcIAWqGDnR"://tienda admin
          return(<StorePage onUpdateAppState={this._updateAppState} appState={this.state}/>)
      default:
      break;

    }
  }

  render() {
    return (
      <div className="App">

          {this.state.notification != null?
            <Notification onCloseNotification={this._updateAppState}
                          appState={this.state}
                          type={this.state.notification.type}
                          message={this.state.notification.message}
                          />
            :
            <div></div>
          }
          {this.state.userParams == null?
            <div>
              <NavBarAdmin onResults={this._updateAppState} appState={this.state} showLogin = {true}/>
              <ImageBackground/>
              <StartPage/>
            </div>
            :
            this._loadFormWithUserParams()
          }
          <Footer/>

          {/*{this.state.notification != null?
            <Notification onCloseNotification={this._updateAppState} appState={this.state} type={this.state.notification.type} message={this.state.notification.message}/>
            :
            <div></div>
          }
          {this.state.userParams == null?
            <PrincipalPage onResults={this._updateAppState} appState={this.state}/>
            :
            this._loadFormWithUserParams()
          }*/}
      </div>
    );
  }
}

export default App;
