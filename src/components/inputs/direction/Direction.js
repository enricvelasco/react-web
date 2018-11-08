import React, { Component } from 'react';
import {InputText} from '../text/InputText'

export class Direction extends Component{
  constructor(props){
    super(props)

    if(props.value !== undefined){
        this.value = props.value
    }else{
        this.value = {
          country:"",
          city:"",
          street:"",
          number:"",
          postalCode:""
        }
    }
  }

  _respInput = (res, val, err) =>{
    this.value[res]=val
    this.props.onResults(this.props.resourceName, this.value, false)
  }

  render(){
    return(
      <div>
      <InputText id="country" inputTitle="País" resourceName="country" required={true} onResults={this._respInput} value={this.value.country}/>
      <InputText id="city" inputTitle="Ciudad" resourceName="city" required={true} onResults={this._respInput} value={this.value.city}/>
      <InputText id="street" inputTitle="Calle" resourceName="street" required={true} onResults={this._respInput} value={this.value.street}/>
      <InputText id="number" inputTitle="Número" resourceName="number" required={true} onResults={this._respInput} value={this.value.number}/>
      <InputText id="postalCode" inputTitle="Código Postal" resourceName="postalCode" required={true} onResults={this._respInput} value={this.value.postalCode}/>
      </div>
    )
  }
}
