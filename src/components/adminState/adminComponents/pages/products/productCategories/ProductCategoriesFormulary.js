import React, { Component } from 'react';
import {InputText} from '../../../../../inputs/text/InputText'
import {Checkbox} from '../../../../../inputs/checkbox/Checkbox'
import {Radio} from '../../../../../inputs/radio/Radio'
import {Select} from '../../../../../inputs/select/Select'

export class ProductCategoriesFormulary extends Component{
  constructor(props){
    super(props)
    this.state = {tabSelect:0, isFather:false/*,paramsMount:this._paramsSection0()*/};
    this.objectToSave = {}
    if(this.props.idToEdit != null){
      console.log("IS EDITION");
    }
  }

  render(){
    return(
      <div>
        <div className="list-maintenance title-mant-content">
          <p className="title">{this.props.title == null? "" : this.props.title}</p>
          <p className="subtitle">{this.props.subtitle == null? "" : this.props.subtitle}</p>
        </div>
        <div className="tabs">
          <ul>
            <li className={this._isActive(0)} onClick={() => this._changeActiveTab(0)}><a>Category data</a></li>
          </ul>
        </div>
        <article className="margin-block-inputs">
          {this._paramsSection0()}
        </article>
        <div className="buttons">
          <button className="button is-success" onClick={((e) => this._clickSave(e))}>Save</button>
          <button className="button is-warning" onClick={((e) => this._clickCancel(e))}>Cancel</button>
        </div>
      </div>
    )
  }

  _clickCancel=()=>{
    this.props.onCancel()
  }

  _clickSave=()=>{
    this.props.onSave(this.objectToSave)
  }

  _respInput=(res, val)=>{
    //this.props.onSave("hola")


    this.objectToSave[res]=val
    this.setState({isFather:this._getIsFather()})
  }

  _paramsSection0=()=>{
    console.log("ENTRA A CARGAR CAMPOS");
    return(

      <div>
          <InputText inputTitle="Code" resourceName="code" onResults={this._respInput}/>
          <InputText inputTitle="Name" resourceName="name" onResults={this._respInput}/>
          <Checkbox inputTitle="Is Father" resourceName="isFather" onResults={this._respInput}/>
          {this.state.isFather?
            <div></div>
            :
            <Select inputTitle="Select Father" resourceName="fatherCategory" url={"productCategories"} showFields={["code", "name"]} filter={["isFather","==",true]} onResults={this._respInput}/>
          }
          <InputText inputTitle="Observations" resourceName="observations" onResults={this._respInput}/>
      </div>
    )
  }

  _getIsFather=()=>{
    if(this.objectToSave.isFather == undefined || !this.objectToSave.isFather){
      return false
    }else{
      return true
    }
  }


  _paramsSection1=()=>{
    return(
      <div>section 1</div>
    )
  }

  _paramsTab=(select)=>{
    switch (select) {
      case 0:
        this.setState({paramsMount:this._paramsSection0()})
      break;
      /*case 1:
        this.setState({paramsMount:this._paramsSection1()})
      break;*/

    }
  }

  _changeActiveTab =(select)=>{
		console.log("CAMBIO TAB", select);
		this.setState({
			tabSelect:select
		})
		this._paramsTab(select)
	}
	_isActive = (select) =>{
		console.log("IS ACTIVE", select);
		let classRet=""
		if(this.state.tabSelect == select){
			classRet = "is-active"
		}
		return classRet
	}
}
