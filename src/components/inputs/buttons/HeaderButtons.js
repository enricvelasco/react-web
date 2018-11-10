import React, { Component } from 'react';

export class HeaderButtons extends Component{
  constructor(props){
    super(props)
  }

  _actionButton=(e,action)=>{
    this.props.retActionButton(action)
  }

  render(){
    var newButton
    var deleteButton
    if(this.props.showNewButton === undefined || this.props.showNewButton){
      newButton = <button className="button is-primary" onClick={((e) => this._actionButton(e, "new"))}>New</button>
    }
    if(this.props.showDeleteButton === undefined || this.props.showDeleteButton){
      deleteButton = <button className="button is-danger" onClick={((e) => this._actionButton(e, "delete"))}>Delete</button>
    }

    return(
      <div className="buttons">
        {deleteButton}
        {newButton}
      </div>
    )
  }

}
