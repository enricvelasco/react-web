import React, { Component } from 'react';
import {UsersList} from "./UsersList"
import {UsersFormulary} from "./UsersFormulary"
import {UsersFormularyAssociation} from "./UsersFormularyAssociation"

import firebase from 'firebase';
import db from '../../../../../firebase'

export class Users extends Component{
  constructor(props){
    super(props)
    this.state={}

    this._mountParams()
  }

  componentWillUpdate(props,state){
    console.log("component will update", props, state);

  }
  componentWillReciveProps(props){
    console.log("Component will recieve props");
  }

  _mountParams=()=>{
    this.title = "Usuarios"
    this.subtitle = "Listado de usuarios"
    this.state={stateMode:"list"}
  }

  _onReturnEdit=(returned)=>{
    this.state.stateMode="edit"
    this.idToEdit = returned
  }

  _onReturnNew=()=>{
    console.log("RETURN NEW FUNC");
    this.setState({stateMode:"new"})
  }

  _onCancel=()=>{
    this.setState({stateMode:"list"})
  }

  _onSave=(object)=>{
    console.log("GUARDAR DOCUMENT", object);
    var user = firebase.auth().currentUser;
    object.userCreation = user.uid
    object.dateCreation = new Date()

    //primero crea el usuario y despues añade los parametros a la bbdd
    firebase.auth().createUserWithEmailAndPassword(object.email, object.password).then((user)=>{
      console.log("USUARIO CREADO OK", user.user);
      console.log("OBJETO CREAR", object);
      object.uid = user.user.uid
      if(object.userDomain.association !== undefined){
        object.idAssociation = object.userDomain.association.id
        object.idStore = object.userDomain.id
      }else{
        object.idAssociation = object.userDomain.id
        object.idStore = null
      }

      delete object.password
      db.collection(this.props.urlMapping).doc(object.uid).set(object)
      .then(() => {
          console.log("USUARIO AÑADIDO OK ");
          this.setState({stateMode:"list"})
      })
      .catch(function(error) {
          console.error("ERROR AL AÑADIR", error);
      });

    }).catch((error) => {
      // Handle Errors here.
      console.log("ERROR AL CREAR USUARIO", error);
    });

    /*db.collection(this.props.urlMapping).add(object)
    .then((docRef) => {
        console.log("ASOCIACION AÑADIDA OK: ", docRef.id);
        this.setState({stateMode:"list"})
    })
    .catch(function(error) {
        console.error("ERROR AL AÑADIR", error);
    });*/
  }

  _onUpdate=(object)=>{
    console.log("UPDATE DOCUMENT", object);
    var user = firebase.auth().currentUser;
    object.userModification = user.uid
    object.dateModification = new Date()
    db.collection(this.props.urlMapping).doc(this.idToEdit).update(object)
    .then(() => {
        console.log("UPDATED OK");
        this.setState({stateMode:"list"})
    })
    .catch(function(error) {
        console.error("ERROR AL ACTUALIZAR", error);
    });

  }

  _loadStateMode=()=>{
    var formulary
    switch (this.state.stateMode) {
      case "list":
          return(<UsersList title={this.title} subtitle={this.subtitle} urlMapping={this.props.urlMapping} filter={this.props.filter} onReturnEdit={this._onReturnEdit} onReturnNew={this._onReturnNew}/>)
      case "new":
          if(this.props.personalizedComponentFormulary === "association"){
            formulary=<UsersFormularyAssociation onCancel={this._onCancel} onSave={this._onSave} idAssociation={this.props.idAssociation} userLevelFilter={this.props.userLevelFilter}/>
          }else{
            formulary=<UsersFormulary onCancel={this._onCancel} onSave={this._onSave}/>
          }
          return formulary
      case "edit":
          if(this.props.personalizedComponentFormulary === "association"){
            formulary = <UsersFormularyAssociation urlMapping={this.props.urlMapping} idUrl={this.idToEdit} onCancel={this._onCancel} onSave={this._onSave} idAssociation={this.props.idAssociation} userLevelFilter={this.props.userLevelFilter}/>
          }else{
            formulary =< UsersFormulary urlMapping={this.props.urlMapping} idUrl={this.idToEdit} onCancel={this._onCancel} onSave={this._onUpdate}/>
          }
          return formulary
      default:

    }
  }

  render(){
    return(
      <div>
        {this._loadStateMode()}
      </div>
    )
  }
}
