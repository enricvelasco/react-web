import React, { Component } from 'react';
import {ClipLoader} from 'react-spinners';
import './Loading.css'
export class Loading extends Component{
  constructor(props){
    super(props)
    if(props.color === undefined){
      this.color = '#123abc'
    }else{
      this.color = props.color
    }
  }

  render(){
    return(
      <div className='sweet-loading loading-class'>
        <ClipLoader
          sizeUnit={"px"}
          size={50}
          color={this.color}
        />
      </div>
    )
  }

}
