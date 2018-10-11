import React, { Component } from 'react';

export class InputPassword extends Component{
  constructor(props){
    super(props)
    if(this.props.value != null){
      this.value = this.props.value
      this.props.onResults(this.props.resourceName, this.value)
    }
  }

  _textChanges=(e)=>{
    //console.log("CHANGE TEXT", e.target.value);
    this.props.onResults(this.props.resourceName, e.target.value)
  }

  render(){
    return(
      <div className="padding-input">
        <ul>
          <li className="title-input"><p>{this.props.inputTitle}</p></li>
          <li>
              <input className="input" type="password" onChange={this._textChanges} value={this.value}/>
          </li>
        </ul>
      </div>
    )
  }
}
