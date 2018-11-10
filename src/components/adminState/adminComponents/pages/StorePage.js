import React, { Component } from 'react';
import {LateralMenuStore} from "../components/LateralMenuStore"
import {NavBarAdmin} from "../components/NavBarAdmin"
import {RecordsList} from "./RecordsList"

import {Users} from "./users/Users"
import {Product} from "./products/Product"
import {Store} from "./stores/Store"

import {ProfileContent} from "../components/ProfileContent"

//import 'w3-css/w3.css';

export class StorePage extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.state.content = <RecordsList/>


    //document.getElementById("boxMenuLateral").style.backgroundColor = "lightblue";
    console.log("TIENDA_PROPS", props);
  }

  _menuItemSelected=(itemSelected)=>{
    console.log("ITEM SELECTED", itemSelected);
    switch (itemSelected) {
      case "stores":
        this.setState({content:(<Store
                                urlMapping="stores"
                                initialState="list"
                                filterKeyDoc={this.props.appState.userParams.idStore}
                                showNewButton = {false}
                                showDeleteButton = {false}
                                />)})
      break;
      case "products":
          this.setState({content:(<Product
                                        urlMapping="products"
                                        initialState="list"
                                        filter={["store.id","==",this.props.appState.userParams.idStore]}
                                        defaultValues = {[
                                                          {key:"store", value:{id:this.props.appState.userParams.idStore}}
                                                        ]}
                                        storeInputInvisible = {true}
                                  />)})
      break;

      default:
      break;
    }
  }

  componentDidMount(){
    console.log("COMPONENT DID MOUNT", this.props);
    document.body.style.backgroundColor = this.props.appState.commerce.backgroudColor
    document.getElementById("boxMenuLateral").style.backgroundColor = this.props.appState.commerce.menuColor
    document.getElementById("boxProfileContent").style.backgroundColor = this.props.appState.commerce.profileColor
    document.getElementById("contentBox").style.backgroundColor = this.props.appState.commerce.contentBoxColor
    //document.getElementsByClassName("text-box-profile").style.color =  this.props.appState.commerce.fontProfileMenuColor

    var x = document.getElementsByClassName("text-box-profile");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.color = this.props.appState.commerce.fontProfileMenuColor
    }
  }


  render(){
    console.log("--------------RENDER");
    return(
      <div>
        <NavBarAdmin/>
        <div className="content content-margin">
            <div className="columns">
              <div className="column is-one-quarter">
                <div id="boxProfileContent" className="box">
                  <ProfileContent userParams={this.props.appState.userParams}/>
                </div>
                <div id="boxMenuLateral" className="box">
                  <LateralMenuStore onItemSelected={this._menuItemSelected}/>
                </div>
              </div>
              <div className="column">
                <div id="contentBox" className="box">
                  {this.state.content}
                </div>
              </div>
            </div>
        </div>
      </div>
    )
  }
}
