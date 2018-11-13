import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import {InputText} from '../../../inputs/text/InputText'
import {InputPassword} from '../../../inputs/text/InputPassword'
import {Login} from '../../../pages/Login'

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

  _logInClicked=()=>{
    console.log("CLICK EN LOGIN ABRIR MODAL");
    this.setState({
      openModal:true
    })
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
    /*if(this.state.openModal){
      modalElement = (
        <div>
        <button onClick={this.onOpenModal}>Open modal</button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <h2>Simple centered modal</h2>
        </Modal>
      </div>
    )
  }*/
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

        {/*<div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a clclassNameass="navbar-item">
              Home
            </a>

            <a className="navbar-item">
              Documentation
            </a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                More
              </a>

              <div className="navbar-dropdown">
                <a className="navbar-item">
                  About
                </a>
                <a className="navbar-item">
                  Jobs
                </a>
                <a className="navbar-item">
                  Contact
                </a>
                <hr className="navbar-divider"/>
                <a className="navbar-item">
                  Report an issue
                </a>
              </div>
            </div>
          </div>*/}

          <div className="navbar-end">

            {this.props.showLogin?
                <div className="navbar-item">
                  <div className="buttons">
                    <a className="button is-light" onClick={((e) => this._logInClicked(e))}>
                      Log In
                    </a>
                  </div>
                </div>
              :
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-light">
                    Log Out
                  </a>
                </div>
              </div>
            }


          </div>


            <Modal open={this.state.openModal} onClose={this._closeModal} center>
              <Login onAppStateReturn={this._appStateReturn} appState={this.appState}/>
            </Modal>

      </nav>
    )
  }
}
