import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-editor'

export class PhotoEditor extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.state.image = null
    //this._cargaImagen()
    console.log("CONSTRUCTOR", props);
  }

  _dataURItoBlob=(dataURI) =>{
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

  _deleteElement=(e,action)=>{
    console.log("DELETE ELEMENT", e.target);
    this.props.onResults(e,action, null)
  }

  _onClickSave = (e,action) => {
    console.log("ENTRA AL ASIGNAR", this.editor);
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = this.editor.getImage()

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = this.editor.getImageScaledToCanvas()

      var img = this.editor.getImageScaledToCanvas().toDataURL();
      var rect = this.editor.getCroppingRect();

      let reader = new FileReader();

      this.setState({
        image:img
      })

      console.log("THE ELEMENT ", e.target.value);
      this.ele = e.target.value

      /*canvas.toBlob(function(blob) {
        var newImg = this.editor.createElement("img"),
            url = URL.createObjectURL(blob);

        newImg.onload = function() {
          // no longer need to read the blob so it's revoked
          URL.revokeObjectURL(url);
        };

        newImg.src = url;
        this.editor.body.appendChild(newImg);
      });*/

      /*console.log("URL IMAGEN", canvas.toBlob(function(blob) {
        var newImg = this.editor.createElement("img"),
            url = URL.createObjectURL(blob);

        newImg.onload = function() {
          // no longer need to read the blob so it's revoked
          URL.revokeObjectURL(url);
        };

        newImg.src = url;
        this.editor.body.appendChild(newImg);
      }),"image/jpeg", 0.95);*/

      /*var dataURL = this.editor.getImageScaledToCanvas().toDataURL('image/jpeg', 0.5);
      var blob = this._dataURItoBlob(dataURL);
      var fd = new FormData(document.forms[0]);
      fd.append("canvasImage", blob);*/

    /*  var reader = new FileReader();
      reader.onloadend = function() {
        var tempImg = new Image();
        tempImg.src = reader.result;
        tempImg.onload = function() {

        }

      }*/
      canvasScaled.toBlob((blob) =>{
        console.log('Este es el blob: ', blob);
        //console.log('Este es el E: ', this.ele);
        var image = new Image();
        image.src = blob;
        this.props.onResults(this.ele,action,blob)
      }, 'image/png', 0.8)

      //this.props.onResults(canvas)
    }
  }

  setEditorRef = (editor) => this.editor = editor
  render() {
    console.log("ENTRADA IMAGES", this.props.urlImage);
    let buttons //= <div>hola</div>;
    if(this.props.state == "edit"){
      {/*buttons = <div className="margin-top-pages item-inside-abs select-align">
                  <div className="file is-large has-name button-adapt-to-image">
                    <span className="file-icon">
                      <img src="https://firebasestorage.googleapis.com/v0/b/visitore-cli.appspot.com/o/system%2Ficons%2Ficons8-cancelar-80.png?alt=media&token=0453eabd-2aba-431c-91cd-a8e0a96b3747" value={this.props.urlImage} onClick={((e) => this._deleteElement(e, "deleteEdit"))}/>
                    </span>
                  </div>
                  <div className="file is-large has-name button-adapt-to-image">
                    <span className="file-icon">
                      <img src="https://firebasestorage.googleapis.com/v0/b/visitore-cli.appspot.com/o/system%2Ficons%2Ficons8-save-close.png?alt=media&token=c2ecbcf5-ba80-47a6-ba38-023769d01d31"/>
                    </span>
                  </div>
                </div>*/}
      buttons = <div className="margin-top-pages item-inside-abs select-align">
                  <div className="file is-large has-name button-adapt-to-image">
                    <button className="button is-small is-danger is-rounded" value={this.props.urlImage} onClick={((e) => this._deleteElement(e, "deleteEdit"))}>X</button>
                  </div>
                </div>
    }else if(this.props.state == "new"){
      {/*buttons = <div className="margin-top-pages item-inside-abs select-align">
                  <div className="file is-large has-name button-adapt-to-image">
                    <button className="button is-small" value={this.props.urlImage} onClick={((e) => this._deleteElement(e, "delete"))}>
                      <span className="icon is-small">
                        <img src="https://firebasestorage.googleapis.com/v0/b/visitore-cli.appspot.com/o/system%2Ficons%2Ficons8-cancelar-80.png?alt=media&token=0453eabd-2aba-431c-91cd-a8e0a96b3747"/>
                      </span>
                    </button>
                  </div>
                  <div className="file is-large has-name button-adapt-to-image">
                    <button className="button is-small" value={this.props.urlImage} onClick={((e) => this._onClickSave(e, "save"))}>
                      <span className="icon is-small">
                        <img src="https://firebasestorage.googleapis.com/v0/b/visitore-cli.appspot.com/o/system%2Ficons%2Ficons8-save.png?alt=media&token=5a436f65-bd91-4774-b3d6-150de52af440"/>
                      </span>
                    </button>
                  </div>
                </div>*/}
        buttons = <div className="margin-top-pages item-inside-abs select-align">
                    <div className="file is-large has-name button-adapt-to-image">
                      <button className="button is-small is-danger is-rounded" value={this.props.urlImage} onClick={((e) => this._deleteElement(e, "delete"))}>X</button>
                    </div>
                    <div className="file is-large has-name button-adapt-to-image">
                      {this.props.objTemp.saved?
                        <button className="button is-small is-info is-rounded" value={this.props.urlImage} onClick={((e) => this._onClickSave(e, "save"))}>UP</button>
                        :
                        <button className="button is-small is-success is-rounded" value={this.props.urlImage} onClick={((e) => this._onClickSave(e, "save"))}>V</button>
                      }
                    </div>
                  </div>
    }
    return (
      <div className="item-adapt-to-content bloq-position-relative">
        {buttons}

        <AvatarEditor className={this.props.className}
          ref={this.setEditorRef}
          image={this.props.urlImage}
          width={this.props.size.width}
          height={this.props.size.height}
          border={50}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1}
          rotate={0}
        />
      </div>
    )
  }
}
