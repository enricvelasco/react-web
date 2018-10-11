import React, { Component } from 'react';

export class Checkbox extends Component{
  constructor(props){
    super(props)
    if(this.props.value != null){
      this.value = this.props.value
      this.props.onResults(this.props.resourceName, this.value)
    }/*else{
      this.value = false;
    }*/
    this.inputTitle = this.props.inputTitle
  }

  _checkboxChange=(e)=>{
    console.log("CHANGE TEXT", e.target.value);
    console.log("CHANGE TEXT", e.target.checked);


    this.value = e.target.checked;
    console.log("CHANGE TEXT V", this.value);

    this.props.onResults(this.props.resourceName, this.value)
  }

  render(){
    return(
      <div className="padding-input select-align">
        <ul className="list-without-marks">
          <li className="title-input">
            <label className="checkbox">
              <input type="checkbox" onChange={this._checkboxChange} checked={this.value} value={this.value}/>
                &nbsp;{this.inputTitle}
            </label>
          </li>
        </ul>
      </div>
    )
  }
}
