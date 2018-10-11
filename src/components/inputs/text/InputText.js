import React, { Component } from 'react';

export class InputText extends Component{
  constructor(props){
    super(props)
    console.log("ENTRA A CONSTRUCTOR TEXT", props);

    this.isRequired = this.props.required
    this.inputTitle = this.props.inputTitle
    this.errorState = false

    if(this.props.value != null){
      this.value = this.props.value
      var retErr
      if(this.isRequired && (this.value==null || this.value=="")){
        retErr = true
      }else{
        retErr = false
      }
      this.props.onResults(this.props.resourceName, this.value, retErr)
    }


  }

  _textChanges=(e)=>{
    //console.log("CHANGE TEXT", e.target.value, this.errorState);
    this.value = e.target.value
    var retErr

    if(this.isRequired && (this.value==null || this.value=="")){
      retErr = true
    }else{
      retErr = false
    }
    console.log("CHANGE TEXT", e.target.value, retErr);

    this.props.onResults(this.props.resourceName, this.value, retErr)
  }

  render(){
    var inputTextElement;
    if(this.isRequired && (this.value==null || this.value=="")){
      this.errorState = true
      inputTextElement = <div className="padding-input">
                          <ul className="list-without-marks">
                            <li className="title-input">
                              <p>{this.inputTitle}</p>
                            </li>
                            <li>
                                <input className="input is-danger" type="text" onChange={this._textChanges} value={this.value}/>
                            </li>
                          </ul>
                        </div>
    }else{
      this.errorState = false
      inputTextElement = <div className="padding-input">
                          <ul className="list-without-marks">
                            <li className="title-input">
                              <p>{this.inputTitle}</p>
                            </li>
                            <li>
                                <input className="input" type="text" onChange={this._textChanges} value={this.value}/>
                            </li>
                          </ul>
                        </div>
    }

    return(
      <div>
      {inputTextElement}
      </div>
    )
  }
}
