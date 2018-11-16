import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../../../../../firebase'
import "./CardProduct.css"

import {Loading} from '../../../../../states/Loading'

export class CardProduct extends Component {
  constructor(props){
    super(props)
    if(props.name === undefined){
      this.name = "DEMO"
    }else{
      this.name = props.name
    }
    this.state={loading:true}
    //this.arrayELementsToShow = []
    //this.contadorElementos = 0
    var collection = db.collection(this.props.url);
    this._loadData(collection)

  }

  _loadData(coll){
    //this.setState({loading:true})
    this.arrayELementsToShow = []
    coll.where("showInHome","==",true).get().then((querySnapshot) => {
		    querySnapshot.forEach((doc) =>{
		        // doc.data() is never undefined for query doc snapshots
						let registro = {}

						registro = doc.data()
            if(registro.verticalImage[0] !== undefined){
              this.arrayELementsToShow.push(registro)
            }
		    });

        this._timingFunc()


				console.log("RESULTADO CARD PRODUCT", this.arrayELementsToShow);
		}).catch((err)=>{
      console.log(err);
    });
  }

  _timingFunc=()=>{
    this.contadorElementos = 0
    let longitudArray = this.arrayELementsToShow.length
    this.interval = setInterval(() => {
      //this._closeNotification()
      if(this.contadorElementos === longitudArray){
        console.log("SALIR INTERVAL");
        //clearInterval(this.interval);
        this.contadorElementos = 0
      }else{
        console.log("CONTADOR",this.contadorElementos);
        let imgToShow = this.arrayELementsToShow[this.contadorElementos].verticalImage[0].url
        let text1 = this.arrayELementsToShow[this.contadorElementos].name
        this.setState({
          image:imgToShow,
          text1:text1,
          loading:false
        })

        this.contadorElementos ++
      }



    }, 10000);
  }

  _prevElement=()=>{
    console.log("ELEMTO ANTERIOR");
    clearInterval(this.interval);
    this.contadorElementos --
    this._mountCard(this.contadorElementos)
    /*let imgToShow = this.arrayELementsToShow[this.contadorElementos].verticalImage[0].url
    let text1 = this.arrayELementsToShow[this.contadorElementos].name
    this.setState({
      image:imgToShow,
      text1:text1,
      loading:false
    })*/
  }

  _nextElement=()=>{
    console.log("ELEMTO SIGUIENTE");
    clearInterval(this.interval);
    this.contadorElementos ++
    this._mountCard(this.contadorElementos)
  }

  _mountCard=(cont)=>{
    if(cont >= this.arrayELementsToShow.length){
      this.contadorElementos = 0
    }else if(cont < 0){
      this.contadorElementos = this.arrayELementsToShow.length - 1
    }
    let imgToShow = this.arrayELementsToShow[this.contadorElementos].verticalImage[0].url
    let text1 = this.arrayELementsToShow[this.contadorElementos].name
    this.setState({
      image:imgToShow,
      text1:text1,
      loading:false
    })
  }

  componentWillUnmount() {
    console.log("ENTRA A COMPONENT WILL UNMOUNT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    clearInterval(this.interval);
  }

  render(){
    return(
      <div className="w3-card card-class">
        {this.state.loading?
          <Loading color="#FAB017"/>
          :
          <div className="w3-display-container">
            <img src={this.state.image} className="image-card-class" alt="Person" />
            <div className="w3-display-bottommiddle w3-large title-element">
              <h4><b>{this.state.text1}</b></h4>
            </div>
            <a className="w3-padding w3-display-left button-in-image" onClick={((e) => this._prevElement(e))}>&#10094;</a>
            <a className="w3-padding w3-display-right button-in-image" onClick={((e) => this._nextElement(e))}>&#10095;</a>
          </div>
        }

      </div>
    )
  }
}
