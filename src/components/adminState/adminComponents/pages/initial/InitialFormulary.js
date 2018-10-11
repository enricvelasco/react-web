import React, { Component } from 'react';
import {InputText} from '../../../../inputs/text/InputText'
import {Checkbox} from '../../../../inputs/checkbox/Checkbox'
import {Radio} from '../../../../inputs/radio/Radio'
import {Select} from '../../../../inputs/select/Select'
import {Categories} from '../../../../inputs/grid/Categories'
import {InputArrayImages} from '../../../../inputs/images/InputArrayImages'

import firebase from 'firebase';
import db from '../../../../../firebase'

const sizeImage = {width:128, height:128}
export class InitialFormulary extends Component{

  constructor(props){
    super(props)
    this.state = {tabSelect:0, loading:true, objectToSave:{}, errorTree:{}};

    console.log("INITIAL FORMULARY !!!!! ", props);
    if(props.idUrl != null){
      console.log("IS EDITION", props.idUrl);
      this._loadObjectParamsToEdit()
    }else{
      //default object
      this.firstTime = true
      this.state.objectToSave={
        camp0:null,
        camp1:null,
        camp2:null,
        camp3:null,
        camp4:null,
        camp5:null,
        camp6:null,
        camp7:null,
        images:null
      }

      this.state.errorTree={
        camp0:true,
        camp1:false,
        camp2:false,
        camp3:false,
        camp4:false,
        camp5:false,
        camp6:false,
        camp7:false,
        images:false
      }
      this.state.loading=false
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
            <li className={this._isActive(0)} onClick={() => this._changeActiveTab(0)}><a>Column1</a></li>
            <li className={this._isActive(1)} onClick={() => this._changeActiveTab(1)}><a>Column2</a></li>
          </ul>
        </div>
        <article className="margin-block-inputs">
          {this.state.loading?
            <div>loading...</div>
            :
            this._paramsSection0()
          }
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
    //this.props.onSave("hola")

    //this._setError(res, err)

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

    if(this.state.tabSelect==0){
      return(
        <div>
            <InputText inputTitle="Campo0" resourceName="camp0" required={true} onResults={this._respInput} value={this.state.objectToSave.camp0}/>
            <InputText inputTitle="Campo1" resourceName="camp1" onResults={this._respInput} value={this.state.objectToSave.camp1}/>
            <InputText inputTitle="Campo2" resourceName="camp2" onResults={this._respInput} value={this.state.objectToSave.camp2}/>
            <Select inputTitle="Campo3" resourceName="camp3" required={true} url={"usersLevels"} showFields={["code", "name"]} onResults={this._respInput} value={this.state.objectToSave.camp3}/>
            <Checkbox inputTitle="Campo4" resourceName="camp4" onResults={this._respInput} value={this.state.objectToSave.camp4}/>
            {/*}<Radio inputTitle="Campo5" resourceName="camp5" showFields={["code", "name"]} arrayToLoad={null} url={"usersLevels"} style="list" onResults={this._respInput} value={this.objectToSave.camp5}/>*/}
            {/*<Radio inputTitle="Campo6" resourceName="camp6" showFields={["code", "name"]} arrayToLoad={this._loadArrayRadioButton()} url={null} onResults={this._respInput} value={this.objectToSave.camp6}/>*/}
            <InputArrayImages inputTitle="Imagenes" resourceName="images" sizeImage={sizeImage}  onResults={this._respInput} value={this.state.objectToSave.images}/>
        </div>
      )
    }else if(this.state.tabSelect==1){
      return(
        <Categories inputTitle="Select N categories" resourceName="camp7" showFields={["code", "name"]} url={"productCategories"} onResults={this._respInput} value={this.state.objectToSave.camp7}/>
      )
    }

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
      case 1:
        this.setState({paramsMount:this._paramsSection1()})
      break;

    }
  }

  _changeActiveTab =(select)=>{
		console.log("CAMBIO TAB", select);
		this.setState({
			tabSelect:select
		})
	}
	_isActive = (select) =>{
		console.log("IS ACTIVE", select);
		let classRet=""
		if(this.state.tabSelect == select){
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
