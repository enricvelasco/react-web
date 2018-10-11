import React, { Component } from 'react';
import {InputText} from '../../../../inputs/text/InputText'
import {Checkbox} from '../../../../inputs/checkbox/Checkbox'
import {Radio} from '../../../../inputs/radio/Radio'

export class UsersFormulary extends Component{
  constructor(props){
    super(props)
    this.state = {tabSelect:0, paramsMount:this._paramsSection0()};
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
            <li className={this._isActive(0)} onClick={() => this._changeActiveTab(0)}><a>User Params</a></li>
            <li className={this._isActive(1)} onClick={() => this._changeActiveTab(1)}><a>Dirección</a></li>
          </ul>
        </div>
        <article>
          {this.state.paramsMount}
        </article>
      </div>
    )
  }

  _respInput=(res, val)=>{

  }

  _paramsSection0=()=>{
    return(

      <div>
          <InputText inputTitle="Codigo" resourceName="code" value="" onResults={this._respInput}/>
          <InputText inputTitle="Nombre" resourceName="name" value="" onResults={this._respInput}/>
          <InputText inputTitle="URL" resourceName="urlReference" value="" onResults={this._respInput}/>
          <Checkbox inputTitle="Es asociación" onResults={this._respInput}/>
      </div>
    )
  }

  /*_createOptions=()=>{
    var options = []
    var option1 = {name:""}
  }*/

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
