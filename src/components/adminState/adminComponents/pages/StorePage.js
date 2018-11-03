import React, { Component } from 'react';
import {LateralMenuStore} from "../components/LateralMenuStore"
import {NavBarAdmin} from "../components/NavBarAdmin"
import {RecordsList} from "./RecordsList"

import {Users} from "./users/Users"
import {Product} from "./products/Product"
import {Store} from "./stores/Store"

//import 'w3-css/w3.css';

export class StorePage extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.state.content = <RecordsList/>
    console.log("ASSOCIATION PROPS", props);
  }

  _menuItemSelected=(itemSelected)=>{
    console.log("ITEM SELECTED", itemSelected);
    switch (itemSelected) {
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

  render(){
    return(
      <div>
        <NavBarAdmin/>
        <div className="content content-margin">
            <div className="columns">
              <div className="column is-one-quarter">
                <div className="box">
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
