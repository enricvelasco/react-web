import React, { Component } from 'react';

export class HeaderButtons extends Component{
  constructor(props){
    super(props)
  }

  _actionButton=(e,action)=>{
    this.props.retActionButton(action)
  }

  render(){
    return(
      <div className="buttons">
        <button className="button is-danger" onClick={((e) => this._actionButton(e, "delete"))}>Delete</button>
        <button className="button is-primary" onClick={((e) => this._actionButton(e, "new"))}>New</button>
      </div>
    )
  }

}
