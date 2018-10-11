import React, { Component } from 'react';
import {LateralMenu} from "../components/LateralMenu"
import {NavBarAdmin} from "../components/NavBarAdmin"
import {RecordsList} from "./RecordsList"
import {Users} from "./users/Users"
import {UserLevels} from "./userLevels/UserLevels"
import {ProductCategories} from "./products/productCategories/ProductCategories"
import {Initial} from "./initial/Initial"
import {Association} from "./association/Association"

export class AdminPage extends Component {
  constructor(){
    super()
    this.state = {}
    //this.appState = this.props.appState
    this.state.content = <RecordsList/>
  }

  _menuItemSelected=(itemSelected)=>{
    console.log("ITEM SELECTED", itemSelected);
    switch (itemSelected) {
      case "initial":
          this.setState({content:(<Initial urlMapping="initial" initialState="list"/>)})
      break;
      case "userParams":
          //this.state.content = <Users urlMapping="userParams"/>
          this.setState({content:(<Users urlMapping="userParams" initialState="list"/>)})
      break;
      case "usersLevels":
          this.setState({content:(<UserLevels urlMapping="usersLevels" initialState="list"/>)})
      break;
      case "productCategories":
          this.setState({content:(<ProductCategories urlMapping="productCategories" initialState="list"/>)})
      break;
      case "association":
          this.setState({content:(<Association urlMapping="association" initialState="list"/>)})
      break;

    }
  }

  render(){
    return(
      <div>
        <NavBarAdmin/>
        <div className="content content-margin">
            <div className="columns">
              <div className="column is-one-quarter">
                <div className="box">
                  <LateralMenu onItemSelected={this._menuItemSelected}/>
                </div>
              </div>
              <div className="column">
                <div className="box">
                  {this.state.content}
                </div>
              </div>
            </div>
        </div>
      </div>
    )
  }
}
