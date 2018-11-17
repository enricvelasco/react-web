import React, { Component } from 'react';
import {InputText} from '../text/InputText'

const generateLatAndLongFromDirection = (address) => {
  return new Promise((resolve, reject) => {
    let streetNumber= address.number
    let route= address.street
    let city=address.city
    let postalCode =address.postalCode
    let country = address.country
    let formatedAddress = streetNumber + route+ ', ' +city+' '+postalCode+', '+country
      fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+ formatedAddress +'&key=AIzaSyDFa7RY03_NVSV-VDs6dIFafo8Tr7yH9fM')
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            //return;
            resolve("error")
          }

          // Examine the text in the response
          response.json().then(function(data) {
            console.log("****",data.results[0].geometry.location);
            resolve(data.results[0].geometry.location)
            //return
          });
        }
      )
      .catch(function(err) {
        resolve("error")
      });
  });
};


/*var generateLatAndLongFromDirection = new Promise(
  function(resolve, reject, address){
    let streetNumber= address.number
    let route= address.street
    let city=address.city
    let postalCode =address.postalCode
    let country = address.country
    let formatedAddress = streetNumber + route+ ', ' +city+' '+postalCode+', '+country
      fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+ formatedAddress +'&key=AIzaSyDFa7RY03_NVSV-VDs6dIFafo8Tr7yH9fM')
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            //return;
            resolve("error")
          }

          // Examine the text in the response
          response.json().then(function(data) {
            console.log("****",data.results[0].geometry.location);
            resolve(data.results[0].geometry.location)
            //return
          });
        }
      )
      .catch(function(err) {
        resolve("error")
      });
    }
  )*/

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

  _solicitarResultados=(address)=>{
    generateLatAndLongFromDirection(address).then(uid => {
      console.log("RETURN PROMISE", uid);
    });
  }

  render(){
    return(
      <div>
      <InputText id="country" inputTitle="País" resourceName="country" required={true} onResults={this._respInput} value={this.value.country}/>
      <InputText id="city" inputTitle="Ciudad" resourceName="city" required={true} onResults={this._respInput} value={this.value.city}/>
      <InputText id="street" inputTitle="Calle" resourceName="street" required={true} onResults={this._respInput} value={this.value.street}/>
      <InputText id="number" inputTitle="Número" resourceName="number" required={true} onResults={this._respInput} value={this.value.number}/>
      <InputText id="postalCode" inputTitle="Código Postal" resourceName="postalCode" required={true} onResults={this._respInput} value={this.value.postalCode}/>
      {/*<a class="button" onClick={() => this._solicitarResultados(this.value)}>Button</a>*/}
      </div>
    )
  }
}
