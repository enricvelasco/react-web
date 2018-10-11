import React, { Component } from 'react';
import {ProductCategoriesFormulary} from "./ProductCategoriesFormulary"
import {ProductCategoriesList} from "./ProductCategoriesList"
import firebase from 'firebase';
import db from '../../../../../../firebase'

export class ProductCategories extends Component{
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
    this.title = "Initial"
    this.subtitle = "Initial list"
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
    db.collection(this.props.urlMapping).add(object)
    .then((docRef) => {//.then((user) => {
        console.log("ASOCIACION AÑADIDA OK: ", docRef.id);
        this.setState({stateMode:"list"})
    })
    .catch(function(error) {
        console.error("ERROR AL AÑADIR", error);
    });
  }

  _loadStateMode=()=>{
    switch (this.state.stateMode) {
      case "list":
          return(<ProductCategoriesList title={this.title} subtitle={this.subtitle} urlMapping={this.props.urlMapping} onReturnEdit={this._onReturnEdit} onReturnNew={this._onReturnNew}/>)
        break;
      case "new":
          return(<ProductCategoriesFormulary onCancel={this._onCancel} onSave={this._onSave}/>)
        break;
      case "edit":
          return(<ProductCategoriesFormulary idUrl={this.idToEdit} onCancel={this._onCancel} onSave={this._onSave}/>)
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
