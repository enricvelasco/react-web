import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../../firebase'

import {Grid} from './Grid'

export class SubgroupList extends Component{
  constructor(props){
    super(props)
    console.log("SUBGROUP LIST", props);
    this.columns = props.columns
    this.rows = []
    this.state = {loading:true}
    this._loadData()

  }

  _loadData(){
    //this.setState({loading:true})
    this.rows = []
    db.collection(this.props.url).where(this.props.filter[0],this.props.filter[1],this.props.filter[2]).get().then((querySnapshot) => {
      console.log("RESULTADO-*****", querySnapshot);
		    querySnapshot.forEach((doc) =>{
		        // doc.data() is never undefined for query doc snapshots
						let registro = {}

						registro = doc.data()
            registro.id = doc.id
            registro.codigoLink = {id:registro.id, code:registro.code}
            this.rows.push(registro)
		    });
        this.setState({loading:false})
				console.log("RESULTADO", this.rows);
		}).catch((err)=>{
      console.log(err);
    });
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
              <Grid
                columns={this.columns}
                rows={this.rows}
                selectableCell={false}
                selectableRow={true}
                onSelect={this._selectedRowsManagement}
              />
            }
          </ul>
        </div>
      </div>
    )
  }
}
