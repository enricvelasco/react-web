import React, { Component } from 'react';
import {LateralMenuAssociation} from "../components/LateralMenuAssociation"
import {NavBarAdmin} from "../components/NavBarAdmin"
import {ProfileContent} from "../components/ProfileContent"
import {RecordsList} from "./RecordsList"

import {Users} from "./users/Users"
import {Product} from "./products/Product"
import {Store} from "./stores/Store"
import {Association} from "./association/Association"

//import 'w3-css/w3.css';

export class AssociationPage extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.state.content = <RecordsList/>
    console.log("ASSOCIATION PROPS", props);
  }

  _menuItemSelected=(itemSelected)=>{
    console.log("ITEM SELECTED", itemSelected);
    switch (itemSelected) {
      case "association":
      this.setState({content:(<Association
                                urlMapping="association"
                                initialState="list"
                                filterKeyDoc={this.props.appState.userParams.idAssociation}
                                showNewButton = {false}
                                showDeleteButton = {false}
                              />)})
      break;
      case "userParams":
          //this.state.content = <Users urlMapping="userParams"/>
          this.setState({content:(<Users
                                    urlMapping="userParams"
                                    initialState="list"
                                    filter={["idAssociation","==",this.props.appState.userParams.idAssociation]}
                                    personalizedComponentFormulary="association"
                                    idAssociation = {this.props.appState.userParams.idAssociation}
                                    userLevelFilter = {["isAccessFromAssociation","==",true]}
                                  />)})
      break;
      case "products":
          this.setState({content:(<Product
                                        urlMapping="products"
                                        initialState="list"
                                        filter={["store.association.id","==",this.props.appState.userParams.idAssociation]}
                                        storesFilter={["association.id","==",this.props.appState.userParams.idAssociation]}
                                  />)})
      break;
      case "stores":
          this.setState({content:(<Store urlMapping="stores"
                                          initialState="list"
                                          associationInputInvisible = {true}
                                          defaultValues = {[
                                                            {key:"association", value:{id:this.props.appState.userParams.idAssociation}}
                                                          ]}
                                          filter={["association.id","==",this.props.appState.userParams.idAssociation]}
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
                  <ProfileContent userParams={this.props.appState.userParams}/>
                </div>
                <div className="box">
                  <LateralMenuAssociation onItemSelected={this._menuItemSelected}/>
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
