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
import {SimpleMap} from '../../../../inputs/maps/SimpleMap'

import firebase from 'firebase';
import db from '../../../../../firebase'

const sizeImage = {width:400, height:400}
const sizeImageBig = {width:1024, height:280}
export class StoreFormulary extends Component{

  constructor(props){
    super(props)
    this.state = {tabSelect:0, loading:true, objectToSave:{}, errorTree:{}};

    console.log("StoreFormulary FORMULARY !!!!! ", props);
    if(props.idUrl != null){
      console.log("IS EDITION", props.idUrl);
      this._loadObjectParamsToEdit()
    }else{
      //default object
      this.firstTime = true
      this.state.objectToSave={
        logo:[],
        storeCategories:[]
      }

      if(this.props.defaultValues !== undefined){
        this.props.defaultValues.forEach((val)=>{
          this.state.objectToSave[val.key] = val.value

        })
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
            <li className={this._isActive(1)} onClick={() => this._changeActiveTab(1)}><a>Datos configuración</a></li>
            <li className={this._isActive(2)} onClick={() => this._changeActiveTab(2)}><a>Dirección</a></li>
            <li className={this._isActive(3)} onClick={() => this._changeActiveTab(3)}><a>Categorías</a></li>
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

  }

  _paramsSection0=()=>{
      var showAsoc
      if(!this.props.associationInputInvisible){
        showAsoc = <Select inputTitle="Asociacón" resourceName="association" required={true} url={"association"} showFields={["code", "name"]} onResults={this._respInput} value={this.state.objectToSave.association}/>

      }
      return(
        <div>
          {showAsoc}
          <InputText id="code" inputTitle="Código" resourceName="code" required={true} onResults={this._respInput} value={this.state.objectToSave.code}/>
          <InputText id="name" inputTitle="Nombre" resourceName="name" required={true} onResults={this._respInput} value={this.state.objectToSave.name}/>

        </div>
      )

  }
  _paramsSection1=()=>{
    return(
      <div>
        <InputText id="domain2" inputTitle="Url Dominio" resourceName="domain" required={true} onResults={this._respInput} value={this.state.objectToSave.domain}/>
        <InputArrayImages id="logo" inputTitle="Logo" resourceName="logo" sizeImage={sizeImage}  onResults={this._respInput} value={this.state.objectToSave.logo}/>
        <InputArrayImages id="mainLogo" inputTitle="Logo" resourceName="mainLogo" sizeImage={sizeImageBig}  onResults={this._respInput} value={this.state.objectToSave.mainLogo}/>
      </div>
    )
  }

  _paramsSection2=()=>{
    return(
      <div>
        <Direction id="direction" resourceName="direction" onResults={this._respInput} value={this.state.objectToSave.direction}/>
        <SimpleMap/>
      </div>
    )
  }

  _paramsSection3=()=>{
    return(
      <div>
      <Categories inputTitle="Categorías de Tiendas" resourceName="storeCategories" showFields={["code", "name"]} url={"storeCategories"} onResults={this._respInput} value={this.state.objectToSave.storeCategories}/>
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
