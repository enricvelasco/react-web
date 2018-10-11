import React, { Component } from 'react';
import {ClipLoader} from 'react-spinners';

export class Loading extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className='sweet-loading'>
        <ClipLoader
          sizeUnit={"px"}
          size={50}
          color={'#123abc'}
        />
      </div>
    )
  }

}
