import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../../../../firebase'
import {Loading} from '../../../../states/Loading'
import {Grid} from '../../../../inputs/grid/Grid'
import {HeaderButtons} from '../../../../inputs/buttons/HeaderButtons'
import {LinkColumn} from '../../../../inputs/grid/componentsColumns/LinkColumn'

export class StoreList extends Component{
  constructor(props){
    super(props)
    this.state={loading:true}
    this._loadCollection()
    //this._moutColumns(
  }

  componentWillUpdate(props,state){
    console.log("StoreList LIST-componentWillUpdate", props, state);
    //this._loadData();
  }

  _moutColumns(){
    this.columns = [
      { key: 'codigoLink', name: 'Código', formatter: <LinkColumn nameLinkColumn="code" onResults={this._respuestaCampoLink}/>},
      { key: 'name', name: 'Nombre'}];
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
        console.log("CLICK SOBRE DELETE", this.rows);
        this._deleteSelectedRows()
      break;
    default:
      break;

    }
  }

  _loadCollection=()=>{
    console.log("CARGA RESULTADOS COMBO",this.props);
      var collection = db.collection(this.props.urlMapping);
      if(this.props.filter === undefined){
        this._loadData(collection)
      }else{
        var filter = this.props.filter;
        var query = collection.where(filter[0], filter[1],filter[2]);
        this._loadData(query)
      }

  }

  _loadData(coll){
    //this.setState({loading:true})
    this.rows = []
    coll.get().then((querySnapshot) => {
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
				console.log("RESULTADO StoreList", this.rows);
		}).catch((err)=>{
      console.log(err);
    });
  }

  _selectedRowsManagement=(rowArr)=>{
    rowArr.forEach((resp) =>{
      this.rows.forEach((son) =>{
        if(resp.id == son.id){
          son.selected = resp.selected
        }
      })
    })
  }

  _deleteSelectedRows=()=>{
    this.setState({loading:true})
    this.rows.forEach((son) =>{
      if(son.selected){
        //son.selected = resp.selected
        db.collection(this.props.urlMapping).doc(son.id).delete().then(() =>{
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
      }
    })

    this._loadCollection()
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
          <Grid
            columns={this.columns}
            rows={this.rows}
            selectableCell={false}
            selectableRow={true}
            onSelect={this._selectedRowsManagement}
          />
        }
      </div>
    )
  }
}
