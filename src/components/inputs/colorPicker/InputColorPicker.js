import React, { Component } from 'react';

import './PopOver.css';

import { SketchPicker } from 'react-color';
import {InputText} from '../text/InputText'
export class InputColorPicker extends Component{
  constructor(props){
    super(props)
    console.log("CARGA INPUT COLOR", props);

    if(props.value != undefined){
        this.value = props.value
    }else{
        this.value = ""
    }
    this.state={}
    this.state.color = this.value
  }

  _handleChangeComplete=(color)=>{
    console.log("HANDLE CHANGE COMPLETE", color);
    this.setState({
      color:color.hex
    })
    this.value = color.hex
    this.props.onResults(this.props.resourceName, this.value, false)
  }

  _asignColor=(res, val, err)=>{
    console.log("ASIGN COLOR", res, err);

  }

  render(){
    return(
      <div className="padding-input">

          <div className="popover__wrapper">
          <InputText
                      inputTitle={this.props.inputTitle}
                      resourceName={this.props.resourceName}
                      required={this.props.required}
                      onResults={this._asignColor}
                      value={this.state.color}
            />
            <div className="push popover__content">
              <p className="popover__message">How you doin</p>
              <SketchPicker
                color={ this.state.color }
                onChangeComplete={ this._handleChangeComplete }
              />
            </div>
          </div>
      </div>

    )
  }
}
