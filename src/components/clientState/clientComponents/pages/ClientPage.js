import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../../../firebase'

export class ClientPage extends Component {
  constructor(){
    super()
    this.state = {}
    //this.appState = this.props.appState
    this._loadData()
  }

  _loadData(){
    //this.setState({loading:true})
    this.rows = []
    db.collection("association").get().then((querySnapshot) => {
		    querySnapshot.forEach((doc) =>{
		        // doc.data() is never undefined for query doc snapshots
						let registro = {}

						registro = doc.data()
            registro.id = doc.id
            registro.codigoLink = {id:registro.id, code:registro.camp0}
            this.rows.push(registro)
		    });
				console.log("RESULTADO", querySnapshot);
		}).catch((err)=>{
      console.log(err);
    });
  }


  render(){
    return(
      <div>HOLA CLIENT</div>
    )
  }
}
