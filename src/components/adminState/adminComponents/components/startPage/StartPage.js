import React, { Component } from 'react';

import {CardProduct} from '../cards/cardProduct/CardProduct'
import './StartPage.css'

export class StartPage extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="columns is-desktop bloq-cards">
          <CardProduct className="column" url="productsPublic"/>
          <CardProduct className="column" url="storesPublic"/>
          <CardProduct className="column" url="associationPublic"/>
          {/*<CardProduct url={null}/>*/}
      </div>
    )
  }
}
