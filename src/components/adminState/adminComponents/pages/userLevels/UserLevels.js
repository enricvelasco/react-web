import React, { Component } from 'react';
import {UserLevelsFormulary} from "./UserLevelsFormulary"
import {UserLevelsList} from "./UserLevelsList"

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
    this.title = "User Levels"
    this.subtitle = "User Levels list"
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

  _loadStateMode=()=>{
    switch (this.state.stateMode) {
      case "list":
          return(<UserLevelsList title={this.title} subtitle={this.subtitle} urlMapping={this.props.urlMapping} onReturnEdit={this._onReturnEdit} onReturnNew={this._onReturnNew}/>)
        break;
      case "new":
          return(<UserLevelsFormulary/>)
        break;
      case "edit":
          return(<UserLevelsFormulary idUrl={this.idToEdit}/>)
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
