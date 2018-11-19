import React, { Component } from 'react';
import {AssociationList} from "./AssociationList"
import {AssociationFormulary} from "./AssociationFormulary"

import firebase from 'firebase';
import db from '../../../../../firebase'

const generateLatAndLongFromDirection = (address) => {
  return new Promise((resolve, reject) => {
    let streetNumber= address.number
    let route= address.street
    let city=address.city
    let postalCode =address.postalCode
    let country = address.country
    let formatedAddress = streetNumber + route+ ', ' +city+' '+postalCode+', '+country
      fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+ formatedAddress +'&key=AIzaSyDFa7RY03_NVSV-VDs6dIFafo8Tr7yH9fM')
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            //return;
            resolve("error")
          }

          // Examine the text in the response
          response.json().then(function(data) {
            console.log("****",data.results[0].geometry.location);
            resolve(data.results[0].geometry.location)
            //return
          });
        }
      )
      .catch(function(err) {
        resolve("error")
      });
  });
};

export class Association extends Component{
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
    this.title = "Asociación"
    this.subtitle = "Listado de asociaciones"
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

    //eliminar parametros repetidos del padre
    generateLatAndLongFromDirection(object.address).then(resp => {
      console.log("RETURN PROMISE", resp);
      object.address.coordinates = resp
      db.collection(this.props.urlMapping).add(object)
      .then((docRef) => {
          console.log("ASOCIACION AÑADIDA OK: ", docRef.id);
          this.setState({stateMode:"list"})
      })
      .catch(function(error) {
          console.error("ERROR AL AÑADIR", error);
      });
    });
  }

  _onUpdate=(object)=>{
    console.log("UPDATE DOCUMENT", object);
    var user = firebase.auth().currentUser;
    object.userModification = user.uid
    object.dateModification = new Date()
    generateLatAndLongFromDirection(object.address).then(resp => {
      object.address.coordinates = resp
      db.collection(this.props.urlMapping).doc(this.idToEdit).update(object)
      .then(() => {
          console.log("UPDATED OK");
          this.setState({stateMode:"list"})
      })
      .catch(function(error) {
          console.error("ERROR AL ACTUALIZAR", error);
      });
    })
  }

  _loadStateMode=()=>{
    switch (this.state.stateMode) {
      case "list":
          return(<AssociationList
            title={this.title}
            subtitle={this.subtitle}
            urlMapping={this.props.urlMapping}
            onReturnEdit={this._onReturnEdit}
            onReturnNew={this._onReturnNew}
            filterKeyDoc={this.props.filterKeyDoc}
            showNewButton={this.props.showNewButton}
            showDeleteButton={this.props.showDeleteButton}
            />)
      case "new":
          return(<AssociationFormulary onCancel={this._onCancel} onSave={this._onSave}/>)
      case "edit":
          return(<AssociationFormulary urlMapping={this.props.urlMapping} idUrl={this.idToEdit} onCancel={this._onCancel} onSave={this._onUpdate}/>)
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
