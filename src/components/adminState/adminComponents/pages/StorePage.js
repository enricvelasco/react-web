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
    this._loadColors()
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
                <div id="contentBox" className="box text-central-box">
                  {this.state.content}
                </div>
              </div>
            </div>
        </div>
      </div>
    )
  }

  _loadColors=()=>{
    if(this.props.appState.commerce.backgroudColor !== undefined){
      document.body.style.backgroundColor = this.props.appState.commerce.backgroudColor
    }
    if(this.props.appState.commerce.menuColor !== undefined){
      document.getElementById("boxMenuLateral").style.backgroundColor = this.props.appState.commerce.menuColor
    }
    if(this.props.appState.commerce.profileColor !== undefined){
      document.getElementById("boxProfileContent").style.backgroundColor = this.props.appState.commerce.profileColor
    }
    if(this.props.appState.commerce.contentBoxColor !== undefined){
      document.getElementById("contentBox").style.backgroundColor = this.props.appState.commerce.contentBoxColor
    }
    if(this.props.appState.commerce.fontProfileMenuColor !== undefined){
      for (let i = 0; i < document.getElementsByClassName("text-box-profile").length; i++) {
          document.getElementsByClassName("text-box-profile")[i].style.color = this.props.appState.commerce.fontProfileMenuColor
      }
    }
    if(this.props.appState.commerce.fontMenuColor !== undefined){
      for (let i = 0; i < document.getElementsByClassName("text-lateral-menu").length; i++) {
          document.getElementsByClassName("text-lateral-menu")[i].style.color = this.props.appState.commerce.fontMenuColor
      }    }
    if(this.props.appState.commerce.fontContentBox !== undefined){
      for (let i = 0; i < document.getElementsByClassName("text-central-box").length; i++) {
          document.getElementsByClassName("text-central-box")[i].style.color = this.props.appState.commerce.fontContentBox
      }
    }
  }
}
