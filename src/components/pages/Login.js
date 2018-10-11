import React, { Component } from 'react';
import firebase from 'firebase'
//import 'firebase/firestore'
//import db from '../../firebase'
import {InputText} from "../inputs/text/InputText"
import{InputPassword} from "../inputs/text/InputPassword"
import {Loading} from "../states/Loading"
import Notification from 'react-bulma-notification';
import {NotificationContainer, NotificationManager} from 'react-notifications';


//import Notification from 'react-bulma-notification';



const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

//var db = firebase.firestore();
export class Login extends Component{
  constructor(props){
    super(props)
    this.appState = this.props.appState
    this.state={userObj:{}, loading:false, isLogged:false}
    this.state.loginTemplate = this._mountLoadingTemplate()
    //this.state.userParams = null
  }

  /*componentWillUpdate(p1, p2){
    console.log("COMPONENT DID UPDATE");
    //this._returnAppState()
  }*/

  /*componentWillUnmount(){
    console.log("ENTRA COMPONENT WILL UNMOUNT")
    this._returnAppState()
  }*/

  _returnAppState=()=>{
    this.props.onAppStateReturn(this.appState)
  }

  _returnResourceValue=(resourceName, resourceValue)=>{
    this.state.userObj[resourceName] = resourceValue
  }

  _setLogout=()=>{
    firebase.auth().signOut()
    .then(()=>{
      // Sign-out successful.
      this.state.isLogged = false
      this.setState({
        loginTemplate:this._mountLoadingTemplate(),
        loading:false
      })
      this.appState.notification={type:4,message:"Logout Success"}
      //this._returnAppState()
    })
    .catch((error)=>{
      this.appState.notification={type:6,message:"Logout error"}
      this._returnAppState()
      //this._returnAppState()
      // An error happened
    });
  }
  _setLogin=(e)=>{
    console.log("HACER LOGIN", this.state);
    this.setState({
      loading:true
    })
    firebase.auth().signInWithEmailAndPassword(this.state.userObj.userName, this.state.userObj.password).then((user) => {
      var user = firebase.auth().currentUser;
      this.state.isLogged = true
      this._getUserParams(user.uid)
      console.log("LOG IN OK");
      //this.appState.notification={type:4,message:"Login Success"}
      //this._returnAppState()
    }).catch((error) =>{
      var errorCode = error.code;
      var errorMessage = error.message;
      this.state.isLogged = false;
      this.setState({
        loading:false
      })
      this.appState.notification={type:6,message:"Login Error"}
      this._returnAppState()
      //this._returnAppState()
      /*if (errorCode === 'auth/wrong-password') {
        console.log("error en password")
      } else if(errorCode === 'auth/user-not-found'){
        console.log("usuario no encontrado")
      }else if(errorCode === 'auth/invalid-email'){
        console.log("email invalido")
      }*/
      console.log("IMPRIME ERROR", error);
    });
  }

  _getUserParams=(idUser)=>{
    firestore.collection("userParams").doc(idUser).get()
    .then((querySnapshot) => {
      console.log("RESPUESTA USER PARAMS ", querySnapshot.data());

      var userParams = {}
      userParams = querySnapshot.data()
      userParams.id = idUser
      this.state.userParams = userParams
      this.setState({
        loginTemplate:this._mountLoadingTemplate(),
        loading:false
      })

      this.appState.userParams=userParams
      this.appState.notification={type:4,message:"Login Success"}
      this._returnAppState()
      //Notification.success("Login correct")
      //NotificationManager.info('Info message');

    }).catch((error)=>{
      console.error("ERROR AL SOLICITAR PARAMETROS USUARIO", error);
      this._setLogout()
      this.state.isLogged = false
      this.setState({
        loginTemplate:this._mountLoadingTemplate(),
        loading:false
      })
      this.appState.notification={type:6,message:"Login Error"}
      this._returnAppState()
    });
  }

  _mountLoadingTemplate=()=>{
    console.log("ENTRA A MONTAR TEMPLATE", this.state);
    if(this.state.isLogged){
      return(<div>
                <p className="title">Welcome</p>
                <ul>
                  <li>
                    {this.state.userParams.code}-{this.state.userParams.name}
                  </li>
                </ul>
                <div className="field">
                  <p className="control">
                    <button className="button is-link margin-button" onClick={this._setLogout}>LogOut</button>
                  </p>
                </div>
              </div>)
    }else{
      return(<div>
                <p className="title">Access</p>
                <ul>
                  <li>
                    <InputText onResults={this._returnResourceValue} inputTitle="Username" resourceName="userName" value="prueba@prueba.com"/>
                  </li>
                  <li>
                    <InputPassword onResults={this._returnResourceValue} inputTitle="Password" resourceName="password" value="prueba"/>
                  </li>
                </ul>
                <div className="field">
                  <p className="control">
                    <button className="button is-link margin-button" onClick={this._setLogin}>Login</button>
                  </p>
                </div>
              </div>)
    }
  }

  render(){
    //this._returnAppState()
    return(
      <div>
        {this.state.loading?
          <Loading/>
          :
          this.state.loginTemplate
        }
      </div>
    )
  }
}
