import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../../../../firebase'
import {Loading} from '../../../../states/Loading'
import {Grid} from '../../../../inputs/grid/Grid'
import {HeaderButtons} from '../../../../inputs/buttons/HeaderButtons'
import {LinkColumn} from '../../../../inputs/grid/componentsColumns/LinkColumn'

export class UserLevelsList extends Component{
  constructor(props){
    super(props)
    this.state={loading:true}
    this._loadData()
    //this._moutColumns()
  }

  componentWillUpdate(props,state){
    console.log("USER LIST-componentWillUpdate", props, state);
    //this._loadData();
  }

  _moutColumns(){
    this.columns = [
      { key: 'codigoLink', name: 'Code', formatter: <LinkColumn nameLinkColumn="code" onResults={this._respuestaCampoLink}/>},
      { key: 'name', name: 'Name'}];
  }

  _respuestaCampoLink=(e)=>{
    console.log("CLICK EN LINK id", e.id)
    //console.log("CLICK EN LINK data", e.data());
		this.props.onReturnEdit(e.id)
	}

  _actionButton=(action)=>{
    console.log("ACTION",action);
    //this.props.onReturnNew()
    switch (action) {
      case "new":
          console.log("RETURN NEW");
         this.props.onReturnNew()
        break;
    case "delete":
        console.log("CLICK SOBRE DELETE");
      break;

    }
  }

  _loadData(){
    //this.setState({loading:true})
    this.rows = []
    db.collection(this.props.urlMapping).get().then((querySnapshot) => {
		    querySnapshot.forEach((doc) =>{
		        // doc.data() is never undefined for query doc snapshots
						let registro = {}

						registro = doc.data()
            registro.id = doc.id
            registro.codigoLink = {id:registro.id, code:registro.code}
            this.rows.push(registro)
		    });
        this._moutColumns()
        this.setState({loading:false})
				console.log("RESULTADO", querySnapshot);
		}).catch((err)=>{
      console.log(err);
    });
  }

  render(){
    return(
      <div>
        <div className="list-maintenance title-mant-content">
          <p className="title">{this.props.title == null? "" : this.props.title}</p>
          <p className="subtitle">{this.props.subtitle == null? "" : this.props.subtitle}</p>
        </div>
        <HeaderButtons retActionButton={this._actionButton}/>
        {this.state.loading?
          <Loading/>
          :
          <Grid columns={this.columns} rows={this.rows}/>
        }
      </div>
    )
  }
}
