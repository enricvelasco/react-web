import React, { Component } from 'react';

export class NavBarAdmin extends Component{
  /*_selectItemMenu=(e, url)=>{
    console.log("SELECCIONA MENU", url);
    this.props.onResults(url)
  }*/
  render(){
    return(
      <nav className="navbar is-transparent" role="navigation" aria-label="dropdown navigation">
        <a className="navbar-item">
          <img src="https://firebasestorage.googleapis.com/v0/b/visitore-cli.appspot.com/o/system%2Flogos%2FlateralCompleto.png?alt=media&token=d5bed93b-3dc9-4b1a-9061-f99073bb92e0" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"/>
        </a>
      </nav>
    )
  }
}
