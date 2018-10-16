import React, { Component } from 'react';
import {UserLevelsList} from "./UserLevelsList"
import {UserLevelsFormulary} from "./UserLevelsFormulary"

import firebase from 'firebase';
import db from '../../../../../firebase'

export class UserLevels extends Component{
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
    this.title = "Niveles Ususario"
    this.subtitle = "Listado de niveles de usuario"
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
    db.collection(this.props.urlMapping).add(object)
    .then((docRef) => {
        console.log("USER LEVEL AÑADIDA OK: ", docRef.id);
        this.setState({stateMode:"list"})
    })
    .catch(function(error) {
        console.error("ERROR AL AÑADIR", error);
    });
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
    switch (this.state.stateMode) {
      case "list":
          return(<UserLevelsList title={this.title} subtitle={this.subtitle} urlMapping={this.props.urlMapping} onReturnEdit={this._onReturnEdit} onReturnNew={this._onReturnNew}/>)
        break;
      case "new":
          return(<UserLevelsFormulary onCancel={this._onCancel} onSave={this._onSave}/>)
        break;
      case "edit":
          return(<UserLevelsFormulary urlMapping={this.props.urlMapping} idUrl={this.idToEdit} onCancel={this._onCancel} onSave={this._onUpdate}/>)
        break;
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
