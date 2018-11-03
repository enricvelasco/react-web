import React, { Component } from 'react';
import {InputText} from '../../../../inputs/text/InputText'
import {Checkbox} from '../../../../inputs/checkbox/Checkbox'
import {Radio} from '../../../../inputs/radio/Radio'
import {Select} from '../../../../inputs/select/Select'
import {Categories} from '../../../../inputs/grid/Categories'
import {InputArrayImages} from '../../../../inputs/images/InputArrayImages'
import {SubgroupList} from '../../../../inputs/grid/SubgroupList'
import {LinkColumn} from '../../../../inputs/grid/componentsColumns/LinkColumn'
import {Users} from "../users/Users"
import {Direction} from '../../../../inputs/direction/Direction'

import firebase from 'firebase';
import db from '../../../../../firebase'

const sizeImage = {width:128, height:128}
export class UsersFormulary extends Component{

  constructor(props){
    super(props)
    this.state = {tabSelect:0, loading:true, objectToSave:{}, errorTree:{}};

    console.log("UsersFormulary FORMULARY !!!!! ", props);
    if(props.idUrl != null){
      console.log("IS EDITION", props.idUrl);
      this._loadObjectParamsToEdit()
    }else{
      //default object
      this.firstTime = true
      this.state.objectToSave={

      }

      this.state.errorTree={
      }
      this.state.loading=false
    }
  }

  render(){
    var params
    if(this.state.loading){
      params = <div>loading...</div>
    }else{
      if(this.state.tabSelect===0){
        params = this._paramsSection0()
      }else if(this.state.tabSelect===1){
        params = this._paramsSection1()
      }else if(this.state.tabSelect===2){
        params = this._paramsSection2()
      }else if(this.state.tabSelect===3){
        params = this._paramsSection3()
      }
    }


    return(
      <div>
        <div className="list-maintenance title-mant-content">
          <p className="title">{this.props.title == null? "" : this.props.title}</p>
          <p className="subtitle">{this.props.subtitle == null? "" : this.props.subtitle}</p>
        </div>
        <div className="tabs">
          <ul>
            <li className={this._isActive(0)} onClick={() => this._changeActiveTab(0)}><a>Datos públicos</a></li>
          </ul>
        </div>
        <article id={this.state.tabSelect} className="margin-block-inputs">
          {params}
        </article>
        <div className="buttons">
          {this._hasErrorInFormulary() || this.firstTime ?
            <button className="button is-success" disabled>Save</button>
            :
            <button className="button is-success" onClick={((e) => this._clickSave(e))}>Save</button>
          }

          <button className="button is-warning" onClick={((e) => this._clickCancel(e))}>Cancel</button>
        </div>
      </div>
    )
  }

  _clickCancel=()=>{
    this.props.onCancel()
  }

  _clickSave=()=>{
    this.props.onSave(this.state.objectToSave)
  }

  _respInput=(res, val, err)=>{
    console.log("ERROR TREEE -1", res, err);
    this.firstTime = false
    this.state.errorTree[res]=err
    this.state.objectToSave[res]=val
    this.setState({
      objectToSave:this.state.objectToSave,
      errorTree:this.state.errorTree
    })
    console.log("RESP INPUT",this.state.objectToSave);

    //PARTE PERSONALIZADA
    if(this.state.objectToSave.usersLevel !== undefined && this.state.objectToSave.usersLevel !== null){
      switch (this.state.objectToSave.usersLevel.id) {
        case ("DVNySnHN1mjDKKQ7srwq")://Niveles de tienda
          this.setState({asignarDominio:"STORE"})
        break;
        case ("4jnemon4i4qcIAWqGDnR")://Niveles de tienda
          this.setState({asignarDominio:"STORE"})
        break;
        case ("aGRHtQc98BazJeFpCiD9")://Niveles de asociaciones
          this.setState({asignarDominio:"ASSOCIATION"})
        break;
        case ("nFELvYL5cYeuXwez9qys")://Niveles de asociaciones
          this.setState({asignarDominio:"ASSOCIATION"})
        break;
        default:
          this.setState({asignarDominio:null})
        break;

      }
    }else{
      this.setState({asignarDominio:null})
    }

  }

  _paramsSection0=()=>{
      var showDomainSelect;
      if(this.state.asignarDominio === "STORE"){
        showDomainSelect = <Select inputTitle="Tienda Dominio" resourceName="userDomain" required={true} url={"stores"} showFields={["code", "name"]} onResults={this._respInput} value={this.state.objectToSave.userDomain}/>
      }else if(this.state.asignarDominio === "ASSOCIATION"){
        showDomainSelect = <Select inputTitle="Asociación Dominio" resourceName="userDomain" required={true} url={"association"} showFields={["code", "name"]} onResults={this._respInput} value={this.state.objectToSave.userDomain}/>
      }
      var showPassword;
      if(this.props.idUrl === undefined){
        showPassword = <InputText id="password" inputTitle="Password" resourceName="password" required={true} onResults={this._respInput} value={this.state.objectToSave.password}/>
      }
      return(
        <div>
          <Select inputTitle="Nivel" resourceName="usersLevel" required={true} url={"usersLevels"} showFields={["code", "name"]} onResults={this._respInput} value={this.state.objectToSave.usersLevel}/>
          {showDomainSelect}
          <InputText id="code" inputTitle="Código" resourceName="code" required={true} onResults={this._respInput} value={this.state.objectToSave.code}/>
          <InputText id="name" inputTitle="Nombre" resourceName="name" required={true} onResults={this._respInput} value={this.state.objectToSave.name}/>
          {/*<InputArrayImages id="logo" inputTitle="Logo" resourceName="logo" sizeImage={sizeImage}  onResults={this._respInput} value={this.state.objectToSave.logo}/>*/}
          <InputText id="phoneNumber" inputTitle="Telefono" resourceName="phoneNumber" required={false} onResults={this._respInput} value={this.state.objectToSave.phoneNumber}/>
          <InputText id="email" inputTitle="Email" resourceName="email" required={true} onResults={this._respInput} value={this.state.objectToSave.email}/>
          {showPassword}
        </div>
      )

  }

  _loadArrayRadioButton=()=>{
    var arr = []
    for(var i=0;i<10;i++){
      var obj = {
        id:i,
        code:"00"+i,
        name:"element_"+i
      }
      arr.push(obj)
    }
    return arr
  }

  _paramsTab=(select)=>{
    switch (select) {
      case 0:
        this.setState({paramsMount:this._paramsSection0()})
      break;
      case 1:
        this.setState({paramsMount:this._paramsSection1()})
      break;
      case 2:
        this.setState({paramsMount:this._paramsSection2()})
      break;
      default:
      break;

    }
  }

  _changeActiveTab =(select)=>{
		console.log("CAMBIO TAB", select);
		this.setState({
			tabSelect:select
		})
    //this._paramsTab(select)
	}
	_isActive = (select) =>{
		console.log("IS ACTIVE", select);
		let classRet=""
		if(this.state.tabSelect === select){
			classRet = "is-active"
		}
		return classRet
	}

  _loadObjectParamsToEdit=()=>{
    this.state.loading=true
    console.log("ENTRA A CARGAR EDICION");
    db.collection(this.props.urlMapping).doc(this.props.idUrl).get().then((doc) => {
				console.log("RESULTADO", doc.data());
        this.setState({loading:false, objectToSave:doc.data()})
		}).catch((err)=>{
      console.log(err);
    });
  }

  _hasErrorInFormulary=()=>{
    var resp = false
    console.log("ERROR TREEE", this.state.errorTree);
    Object.keys(this.state.errorTree).forEach((keyErr) =>{
      if(this.state.errorTree[keyErr]){
        resp = true
      }
    })
    return resp
  }
}
