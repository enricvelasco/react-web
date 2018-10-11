import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../../firebase'

export class Radio extends Component{
  constructor(props){
    super(props)
    /*if(this.props.value != null){
      this.value = this.props.value
      this.props.onResults(this.props.resourceName, this.value)
    }
    this.inputTitle = this.props.inputTitle*/
    this.state = {}
    if(props.arrayToLoad == null && props.url != null){
      this.state.loading = true
      this._loadOptions()
    }else if(props.arrayToLoad != null && props.url == null){
      //this.state.listOptions = props.arrayToLoad
      //this.state.loading = true;
      this._loadArrayOptions()
    }
  }

  _checkboxChange=(e)=>{
    console.log("CHANGE TEXT", e.target.value);

    this.props.onResults(this.props.resourceName, e.target.value)
  }

  _onChangeSelection=(e)=>{
    //console.log("CHANGE TEXT", e.target.checked);
    console.log("CHANGE TEXT", e.target.id);
    this.value = e.target.checked;
    var value
    this.state.objsToSelect.forEach((elem)=>{
      if(elem.id == e.target.id){
        value = elem
      }
    })

    this.props.onResults(this.props.resourceName, value)
  }

  _loadArrayOptions=()=>{
    console.log("ENTRA A MONTAR ARRAY", this.props.arrayToLoad);
    var arrRet = []
    var objResp = []
    var cont = 0;
      this.props.arrayToLoad.forEach((doc, index) =>{
        console.log("RECORRE", doc);
        let resp = doc
        let obj = {}
        //let str="element_"+i
        obj.id = doc.id
        obj.name=  resp[this.props.showFields[0]] +"-"+ resp[this.props.showFields[1]]
        //arrRet.push(<option value={doc.id}>{obj.name}</option>)
        console.log("ASIGNA", obj);
        if(this.props.style == "list"){
          arrRet.push(<li>
                        <input id={doc.id} type="radio" name="foobar" onChange={this._onChangeSelection} checked={this.value} value={this.value}/>
                        &nbsp;{obj.name}
                      </li>)
        }else{
          arrRet.push(<label className="radio">
                        <input id={doc.id} type="radio" name="foobar" onChange={this._onChangeSelection} checked={this.value} value={this.value}/>
                        &nbsp;{obj.name}
                      </label>)
        }


        resp.id = obj.id
        objResp.push(resp)

        cont ++;
      });
      /*this.setState({
        camposCombo:arrRet,
        objsToSelect:objResp
      })*/
      this.state.camposCombo = arrRet
      this.state.objsToSelect = objResp
      console.log("RETORNA ARR 2",this.state);
  }

  _loadOptions=()=>{
    var collection = db.collection(this.props.url);
    collection.get().then((querySnapshot) => {
      var arrRet = []
      var objResp = []
      var cont = 0;
        querySnapshot.forEach((doc) =>{
          let resp = doc.data()
          let obj = {}
          //let str="element_"+i
          obj.id = doc.id
          obj.name=  resp[this.props.showFields[0]] +"-"+ resp[this.props.showFields[1]]
          //arrRet.push(<option value={doc.id}>{obj.name}</option>)
          if(this.props.style == "list"){
            if(this.props.value != null && this.props.value.id == obj.id){
              arrRet.push(<li>
                            <input id={doc.id} type="radio" name="foobar" onChange={this._onChangeSelection} checked={this.value}  value={this.value}/>
                            &nbsp;{obj.name}
                          </li>)
            }else{
              arrRet.push(<li>
                            <input id={doc.id} type="radio" name="foobar" onChange={this._onChangeSelection} checked={this.value}  value={this.value}/>
                            &nbsp;{obj.name}
                          </li>)
            }

          }else{
            /*if(this.props.value != null && this.props.value.id == obj.id){
              this.value = true
            }else{
              this.value = false
            }*/
            arrRet.push(<label className="radio">
                          <input id={doc.id} type="radio" name="foobar" onChange={this._onChangeSelection} /*checked={this.value} value={this.value}*//>
                          &nbsp;{obj.name}
                        </label>)
          }


          resp.id = obj.id
          objResp.push(resp)

          cont ++;
        });
        this.setState({
          camposCombo:arrRet,
          objsToSelect:objResp,
          loading:false
        })
        console.log("RETORNA ARR",this.state);
        //return arrRet
    });
  }

  render(){
    return(
      <div className="padding-input select-align">
        <ul className="list-without-marks">
          <li className="title-input" key={this.props.resourceName+"A"}>
              {this.props.inputTitle}
          </li>
          {this.state.loading ?
            <div>loading...</div>
            :
            <li key={this.props.resourceName}>
              {this.state.camposCombo}
            </li>
          }

        </ul>
      </div>

    )
  }
}
