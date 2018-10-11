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
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"/>
        </a>
      </nav>
    )
  }
}
