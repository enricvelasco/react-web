import React, { Component } from 'react';

import {CardProduct} from '../cards/cardProduct/CardProduct'

export class StartPage extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="columns bloq-cards">
          <CardProduct/>
          <CardProduct/>
          <CardProduct/>
          <CardProduct/>
      </div>
    )
  }
}
