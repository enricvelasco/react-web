import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import {InputText} from '../../../inputs/text/InputText'
import {InputPassword} from '../../../inputs/text/InputPassword'
import {Login} from '../../../pages/Login'

import firebase from 'firebase'

export class NavBarAdmin extends Component{
  /*_selectItemMenu=(e, url)=>{
    console.log("SELECCIONA MENU", url);
    this.props.onResults(url)
  }*/
  constructor(props){
    super(props)
    this.state = {openModal:false}
    this.appState = this.props.appState
  }

  _returnAppState=()=>{
    this.props.onResults(this.appState)
  }

  _logInClicked=()=>{
    console.log("CLICK EN LOGIN ABRIR MODAL");
    this.setState({
      openModal:true
    })
  }

  _logOutClicked=()=>{
    console.log("CLICK EN LOGOUT", this.appState);
    firebase.auth().signOut()
    .then(()=>{
      // Sign-out successful.
      this.state.isLogged = false
      this.appState.userParams = null
      this.appState.notification.message="LogOut Success"
      this._returnAppState()
      console.log("LOGOUT OK");
    })
    .catch((error)=>{
      console.log("LOGOUT ERROR", error);
      //this._returnAppState()
      // An error happened
    });
  }

  _closeModal=()=>{
    this.setState({
      openModal:false
    })
  }

  _appStateReturn=(appStateReturned)=>{

    console.log("APPSTATE RETURNED", appStateReturned);
    this.props.onResults(appStateReturned)
  }

  render(){
    console.log("RENDER");
    var modalElement
    return(
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item">
            <img src="https://firebasestorage.googleapis.com/v0/b/visitore-cli.appspot.com/o/system%2Flogos%2FlateralCompleto.png?alt=media&token=d5bed93b-3dc9-4b1a-9061-f99073bb92e0" width="112" height="28"/>
          </a>

          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
          <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
            {this.props.showLogin?

                    <a className="button is-light" onClick={((e) => this._logInClicked(e))}>
                      Log In
                    </a>

              :
                  <a className="button is-light" onClick={((e) => this._logOutClicked(e))}>
                      Log Out
                    </a>
            }
            </div>
          </div>
          </div>
            <Modal open={this.state.openModal} onClose={this._closeModal} center>
              <Login onAppStateReturn={this._appStateReturn} appState={this.appState}/>
            </Modal>

      </nav>
    )
  }
}
