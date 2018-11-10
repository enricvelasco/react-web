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

    document.body.style.backgroundColor = "red";
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
    console.log("COMPONENT DID MOUNT");
    document.getElementById("boxMenuLateral").style.backgroundColor = "lightblue";
  }

  render(){
    console.log("--------------RENDER");
    return(
      <div>
        <NavBarAdmin/>
        <div className="content content-margin">
            <div className="columns">
              <div className="column is-one-quarter">
                <div className="box">
                  <ProfileContent userParams={this.props.appState.userParams}/>
                </div>
                <div id="boxMenuLateral" className="box">
                  <LateralMenuStore onItemSelected={this._menuItemSelected}/>
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
