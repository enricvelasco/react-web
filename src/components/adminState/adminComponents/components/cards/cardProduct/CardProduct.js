import React, { Component } from 'react';

import "./CardProduct.css"

export class CardProduct extends Component {
  constructor(props){
    super(props)
    if(props.name === undefined){
      this.name = "DEMO"
    }else{
      this.name = props.name
    }
  }

  render(){
    return(
      <div className="w3-card card-class">
        <img src="https://firebasestorage.googleapis.com/v0/b/visitore-cli.appspot.com/o/pictures%2Fblob%3Ahttp%3A%2Flocalhost%3A3000%2F6982db41-67dc-43f9-b002-9621a578fb61?alt=media&token=c1d75391-1b53-4e58-9b94-db09acffc955" className="image-card-class" alt="Person" />
        <div class="w3-container">
          <h4><b>{this.name}</b></h4>
          <p>The boss of all bosses</p>
        </div>
      </div>
    )
  }
}
