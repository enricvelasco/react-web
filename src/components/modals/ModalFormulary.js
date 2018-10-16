import React, { Component } from 'react';
import {UsersFormulary} from '../adminState/adminComponents/pages/users/UsersFormulary';

export class ModalFormulary extends Component{
  constructor(props){
    super(props)
    this.state = {modalClass:"modal is-active"}
  }

  _onSave=(val)=>{
    console.log("RESPUESTA MODAL", val);
    /*this.setState({
      modalClass:"modal"
    })*/
  }

  _onCloseModal=()=>{
    console.log("CANCEL POPUP");
    /*this.setState({
      modalClass:"modal"
    })*/
  }

  render(){
    return(
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          {this.props.component}
        </div>
      </div>
    )
  }
}
