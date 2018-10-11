import React, { Component } from 'react';

export class LinkColumn extends Component{
  constructor(props, context) {
    super(props, context);
    console.log("THIS PROPS LINK", this.props.nameLinkColumn);
    console.log("THIS VALUE", this.props.value);

  }

  _clickEnCampoLink=(e)=>{
    this.props.onResults(this.props.value)
  }

  render(){
    return(
      //<button className="button is-link" onClick={((e) => this._clickEnCampoLink(e))}>Edit</button>
      <a href="#" onClick={((e) => this._clickEnCampoLink(e))}>
        {this.props.value[this.props.nameLinkColumn]}
      </a>
    )}
}
