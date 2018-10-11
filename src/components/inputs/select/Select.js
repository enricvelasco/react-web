import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../../firebase'

export class Select extends Component{
  constructor(props){
    super(props)
    this.isRequired = this.props.required
    this.errorState = false
    this.state = {loading:true, objsToSelect:[]}
    if(this.props.value != null){
      this.value = this.props.value
      var retErr
      if(this.isRequired && (this.value==null || this.value=="")){
        retErr = true
      }else{
        retErr = false
      }
      this.props.onResults(this.props.resourceName, this.value, retErr)
    }else{
      this.value = 0
      this.props.onResults(this.props.resourceName, null, true)
    }

    this._cargarResultadosCombo()
  }

  _cargarResultadosCombo=()=>{
    console.log("CARGA RESULTADOS COMBO");
    var collection = db.collection(this.props.url);
    if(this.props.filter == undefined){
      this._consulta(collection)
    }else{
      var filter = this.props.filter;
      var query = collection.where(filter[0], filter[1],filter[2]);
      this._consulta(query)
    }
  }

  _consulta=(coll)=>{
    coll.get().then((querySnapshot) => {
      var arrRet = []
      var objResp = []
      var cont = 0;
        querySnapshot.forEach((doc) =>{
          let resp = doc.data()
          let obj = {}
          //let str="element_"+i
          obj.id = doc.id
          obj.name=  resp[this.props.showFields[0]] +"-"+ resp[this.props.showFields[1]]

          if(this.props.value != null && this.props.value.id == obj.id){
            this.value = obj.id
            arrRet.push(<option value={doc.id} selected>{obj.name}</option>)
          }else{
            arrRet.push(<option value={doc.id}>{obj.name}</option>)
          }

          resp.id = obj.id
          objResp.push(resp)

          cont ++;
        });
        this.setState({
          camposCombo:arrRet,
          objsToSelect:objResp,
          loading:false
        })
        console.log("RETORNA ARR",this.state);
        //return arrRet
    });
  }

  _mountSelectLoading=()=>{
    return(
      <div className="control select-size">
        <div className="select is-loading select-size">
          <select disabled>
            <option>-Seleccione Opción-</option>
          </select>
        </div>
      </div>
    )
  }

  _mountSelectOptions=()=>{
    return(
      <div className="select select-size">
        <select id="valoresList" className="select-size" onChange={this._changeOnSelect}>
          <option value="0">-Seleccione Opción-</option>
          {this.state.camposCombo}
        </select>
      </div>
    )
  }

  _changeOnSelect=(e)=>{
    console.log("CAMBIO EN SELECT--1", this.state.camposCombo);
    console.log("CAMBIO EN SELECT", e.target.value);
    var value
    this.state.objsToSelect.forEach((elem)=>{
      if(e.target.value==0){
        value=null
      }
      else if(elem.id == e.target.value){
        value = elem
      }
    })

    this.value = e.target.value

    if(this.isRequired && this.value == 0){
      console.log("ERROR SELECT OBLIGATORIO!!!!!!");
      this.errorState = true
    }else{
      console.log("SELECT CONTINUE!!!!!!");
      this.errorState = false
    }

    this.props.onResults(this.props.resourceName, value, this.errorState)
  }

  render(){
    var selectionState

    if(this.state.loading){
      console.log("SELECT LOADING!!!!!!");
      selectionState = this._mountSelectLoading()
    }else if(this.isRequired && this.value == 0){
      console.log("SELECT ERROR!!!!!!");
      this.errorState = true
      selectionState = <div className="select select-size is-danger ">
                          <select id="valoresList" className="select-size" onChange={this._changeOnSelect}>
                            <option value="0">-Seleccione Opción-</option>
                            {this.state.camposCombo}
                          </select>
                        </div>
    }else{
      console.log("SELECT WAI!!!!!!");
      selectionState = this._mountSelectOptions()
    }

    return(
      <div className="padding-input select-align">
      <ul className="list-without-marks">
        <li className="title-input">
          <p>{this.props.inputTitle}</p>
        </li>
        <li>
        {selectionState}
        </li>
      </ul>

      </div>
    )
  }
}



/*<div className="select">
  <select id="valoresList">
    <option value="0">-Seleccione Opción-</option>
    <option value="1">-Option 1-</option>
    <option value="2">-Option 2-</option>
  </select>
</div>*/
