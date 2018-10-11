import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../../firebase'

import {Grid} from './Grid'

//const ReactDataGrid = require('react-data-grid');



/**
*retorna las categorias, ordenadas por padre de modo que por cada lista de subcategorias muestra un grid seleccionable
**/

export class Categories extends Component{
  constructor(props){
    super(props)
    this.arrFathers = []
    this.arrSons = []
    this.state = {loading:true}
    if(this.props.value != null){
      console.log("IS EDICTION CATEGORIES", props.value);
    }else{
      console.log("IS NEW CATEGORIES", props.value);
    }
    this._loadData()

  }

  _loadData(){
    //this.setState({loading:true})
    this.rows = []
    db.collection(this.props.url).get().then((querySnapshot) => {
      console.log("RESULTADO-*****", querySnapshot);
		    querySnapshot.forEach((doc) =>{
		        // doc.data() is never undefined for query doc snapshots
						let registro = {}

						registro = doc.data()
            registro.id = doc.id
            registro.codigoLink = {id:registro.id, code:registro.code}
            this.rows.push(registro)
		    });
        //this._moutColumns()
        //this.setState({loading:false})
        this._mountFathersAndSons()
				console.log("RESULTADO", this.rows);
		}).catch((err)=>{
      console.log(err);
    });
  }


  _mountFathersAndSons=()=>{
    //var arrFathers = []
    //var arrSons = []
    this.rows.forEach((doc) =>{
      if(doc.isFather != undefined && doc.isFather){
        this.arrFathers.push(doc)
      }else{
        if(this.props.value!= null){
          this.props.value.forEach((value) =>{
            if(value.id == doc.id){
              doc.selected = true
            }
          })
        }
        this.arrSons.push(doc)
      }
    })
    this.setState({
      gridsMount:this._mountGrids(),
      loading:false
    })

  }

  _mountGrids=()=>{
    var ret = []
    this.arrFathers.forEach((doc) =>{
      ret.push(
        <div className="padding-input select-align">
          <ul className="list-without-marks">
            <li className="title-input">
                {doc.code}-{doc.name}
            </li>
            <li>
            <Grid columns={this._loadColumns()}
              rows={this._getRows(doc)}
              minHeight={200}
              minWidth={400}
              selectableCell={false}
              selectableRow={true}
              onSelect={this._selectedRowsManagement}/>
            </li>
          </ul>
        </div>
      )
    })
    return(
      ret
    )
  }

  _getRows=(father)=>{
    var arr = []
    this.arrSons.forEach((doc) =>{
      if(father.id == doc.fatherCategory.id){
        arr.push(doc)
      }
    })
    return arr
  }

  _loadColumns=()=>{
    return(
      [
        { key: 'code', name: 'Code'},
        { key: 'name', name: 'Name'}
      ]
    )
  }

  _selectedRowsManagement=(rowArr)=>{
    console.log("ACCION DESPUES DE UNA SELECCION", rowArr);
    rowArr.forEach((resp) =>{
      this.arrSons.forEach((son) =>{
        if(resp.id == son.id){
          son.selected = resp.selected
        }
      })
    })

    var arrResp = []
    this.arrSons.forEach((son) =>{
      if(son.selected){
        arrResp.push(son)
      }
    })

    console.log("RESPUESTA DE SELECCIONES", arrResp);
    this.props.onResults(this.props.resourceName, arrResp)
  }

  render(){
    return(
      <div>
        <div className="padding-input select-align">
          <ul className="list-without-marks">
            <li className="title-input">
                {this.props.inputTitle}
            </li>
            {this.state.loading?
              <div>loading...</div>
              :
              this.state.gridsMount
            }
          </ul>
        </div>
      </div>
    )
  }
}
