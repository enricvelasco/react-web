import React, { Component } from 'react';

export class TextArea extends Component{
  constructor(props){
    super(props)
    console.log("ENTRA A CONSTRUCTOR TextArea", props);

    this.idComp = props.id
    this.isRequired = props.required
    this.inputTitle = props.inputTitle
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
                                <textarea className="textarea is-danger" rows="10" onChange={this._textChanges} value={this.value}></textarea>
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
                                <textarea className="textarea" rows="10" onChange={this._textChanges} value={this.value}></textarea>
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

  shouldComponentUpdate(nextProps, nextState){
    console.log("SHOUD COMP UPDATE", nextProps,nextState)

    this.idComp = nextProps.id
    this.isRequired = nextProps.required
    this.inputTitle = nextProps.inputTitle
    this.errorState = false
    if(nextProps.value === undefined){
      this.value = ""
    }else{
      this.value = nextProps.value
    }


    return true
  }
}
