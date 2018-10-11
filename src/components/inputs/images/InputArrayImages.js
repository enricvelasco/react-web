import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../../firebase'
import {PhotoEditor} from './PhotoEditor'

export class InputArrayImages extends Component{
  constructor(props){
    super(props)
    this.state = {arrFiles:null}
    this.arrayArchivos = []

    if(props.value != null){
      console.log("ESTOY EN EDICION IMAGENES", props.value);
      props.value.forEach((obj) =>{
        this.arrayArchivos.push(obj.url)
      })
      this.state.arrFiles=this.arrayArchivos
    }
  }

  _mountPhotoEditorBloqItem=()=>{
    var arrPhoto = []
    if(this.state.arrFiles != null){
      if(this.arrayArchivos.length == 0){
        arrPhoto.push(<div className="box"></div>)
      }else{
        this.arrayArchivos.forEach((objTemp) =>{
          if(typeof objTemp == 'object'){
            let {imagePreviewUrl} = objTemp
            arrPhoto.push(
                <PhotoEditor
                    className="item-list-image"
                    state = "new"
                    objTemp = {objTemp}
                    urlImage={imagePreviewUrl}
                    size={this.props.sizeImage}
                    onResults={this._actionButton}
                />
            )
          }else if(typeof objTemp == 'string'){
            let imagePreviewUrl = objTemp
            arrPhoto.push(
                <PhotoEditor
                    className="item-list-image"
                    state = "edit"
                    urlImage={imagePreviewUrl}
                    size={this.props.sizeImage}
                    onResults={this._actionButton}
                />
            )
          }
        })
      }

    }else{
      arrPhoto.push(<div className="box"></div>)
    }


    return(
      arrPhoto
    )
  }

  _imagenCentrada=(res)=>{
    console.log("IMAGEN CENTRADA", res);
  }

  _deleteStorageElement=(url)=>{
    var desertRef = url
    var storage = firebase.storage();
    var httpsReference = storage.refFromURL(url);
    // Delete the file
    httpsReference.delete().then(function() {
      // File deleted successfully
      console.log("DELETED OK");
    }).catch(function(error) {
      // Uh-oh, an error occurred!
      console.log("DELETED ERROR");
    });
  }

  _actionButton=(e,action, blob)=>{
    switch (action) {
      case "save":
        console.log("SAVE IMAGE", e);
        var pathTemp = e
        var urlGuardar = URL.createObjectURL(blob)
        //this._saveImage(urlGuardar, blob, pathTemp)

        //evita que haya imagenes antiguas duplicadas
        this.arrayArchivos.forEach((objTemp) =>{
          if(objTemp.imagePreviewUrl == pathTemp && objTemp.downloadURL != null){
            this._deleteStorageElement(objTemp.downloadURL)
          }
        })

        this._saveImage(urlGuardar, blob, pathTemp)

      break;
      case "delete":
        console.log("DELETE IMAGE", e.target.value);
        var updateAfterDelete = []
        //evita guardar imagenes duplicadas
        this.arrayArchivos.forEach((objTemp) =>{
          if(objTemp.imagePreviewUrl != e.target.value){
            updateAfterDelete.push(objTemp)
          }else if(objTemp.imagePreviewUrl == e.target.value && objTemp.downloadURL != undefined){
            this._deleteStorageElement(objTemp.downloadURL)
          }
        })

        this.arrayArchivos = updateAfterDelete
        this.setState({
          arrFiles:this.arrayArchivos
        });

        this.props.onResults(this.props.resourceName, this._mountUrlsToSave())

      break;
      case "deleteEdit":
        console.log("DELETE IMAGE EDIT", e.target.value);
        var updateAfterDelete = []
        this.arrayArchivos.forEach((url) =>{
          if(url == e.target.value){
            this._deleteStorageElement(e.target.value)
          }else{
            updateAfterDelete.push(url)
          }
        })
        this.arrayArchivos = updateAfterDelete
        this.setState({
          arrFiles:this.arrayArchivos
        });

        this.props.onResults(this.props.resourceName, this._mountUrlsToSave())
        break;
    }
  }

  _mountUrlsToSave=()=>{
    var urlsToSave = []
    this.arrayArchivos.forEach((objTemp) =>{
      if(typeof objTemp == 'string'){
        urlsToSave.push({url:objTemp})
      }else{
        if(objTemp.downloadURL != undefined){
          urlsToSave.push({url:objTemp.downloadURL})
        }
      }

    })

    console.log("URLS PRE RETURN", urlsToSave);
    return urlsToSave
  }

  _saveImage=(url, blob, pathTemp)=>{
    const storageRef = firebase.storage().ref('pictures/'+url)
    const task = storageRef.put(blob)
    task.on('state_changed', (snapshot) => {
      // Se lanza durante el progreso de subida
      console.log("SUBIENDO");
    }, (error) => {
      // Si ha ocurrido un error aquí lo tratamos
      console.log("ERROR", error);
    }, (snapshot) => {
      console.log("SE HA SUBIDO EL ARCHIVO", snapshot);
      // Una vez se haya subido el archivo,
      // se invoca ésta función
      task.snapshot.ref.getDownloadURL().then((downloadURL) =>{
        console.log('File available at', downloadURL);
        //return downloadURL
        //this.props.onResults("pathImage", downloadURL)
        this.arrayArchivos.forEach((objTemp) =>{
          if(objTemp.imagePreviewUrl == pathTemp){
            objTemp.downloadURL = downloadURL
            objTemp.saved = true
          }
        })

        this.setState({
          arrFiles:this.arrayArchivos
        });
        this.props.onResults(this.props.resourceName, this._mountUrlsToSave())
        console.log("GUARDADO FINALIZADO ", this.arrayArchivos);
      });
    })
  }

  _readFile(e) {
    console.log("READ FILE!!!!!!!!!!!!!!!!!");
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      //imagePreviewUrl: reader.result
      let objImageTemp = {
        file: file,
        imagePreviewUrl: reader.result
      }
      this.arrayArchivos.push(objImageTemp)
      this.setState({
        arrFiles:this.arrayArchivos
      });
      //this.state.arrFiles.push(objImageTemp)
      console.log("ARR FILES", this.state.arrFiles);
      console.log("LOAD END******");
    }
    reader.readAsDataURL(file)
  }

  render(){
    return(
      <div className="padding-input">
        <ul className="list-without-marks">
          <li className="title-input">
            {this.props.inputTitle}
            <div className="file">
              <label className="file-label">
                <input className="file-input" type="file" name="resume" onChange={(event)=> {
                         this._readFile(event)
                    }}/>
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">
                    Choose a file…
                  </span>
                </span>
              </label>
            </div>
          </li>
          <li>
            {this.state.loading?
              <div>loading...</div>
              :
              <div className="ordered-list-images">
                {this._mountPhotoEditorBloqItem()}
              </div>
            }

          </li>
        </ul>
      </div>

    )

  }
}
