import React, { Component } from 'react';

export class ImageBackground extends Component {
  constructor(){
    super()
  }
  render(){
    return(
      <div className="w3-display-container">
        <img className="image-principal" src="https://firebasestorage.googleapis.com/v0/b/visitore-cli.appspot.com/o/system%2Flogos%2Fimagen_principal%2Fbarcelona-skyline-panorama-at-the-blue-hour.jpg?alt=media&token=8f1ac5dd-cd80-4cce-9174-68f039e2c461" alt="Lights"/>
        <div className="w3-display-middle w3-large">

          <img className="image-logo-principal" src="https://firebasestorage.googleapis.com/v0/b/visitore-cli.appspot.com/o/system%2Flogos%2FCaptura%20de%20pantalla%202018-11-10%20a%20las%2012.14.21_burned.png?alt=media&token=548b989e-def5-444e-a781-fff9b7ac4b4c" alt="Lights"/>
          <p className="text-title-principal-page">VISITORE</p>
          {/*<src className="text-title-principal-page">Visitore</src>*/}
        </div>
      </div>
    )
  }
}
