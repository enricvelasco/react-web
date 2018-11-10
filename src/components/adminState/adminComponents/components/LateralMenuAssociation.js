import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class LateralMenuAssociation extends Component {
  constructor(){
    super()
    this.state = {}
  }

  _elementClicked=(e, url)=>{
    this.props.onItemSelected(url)
  }

  render(){
    return(
      <div>
        <aside className="menu has-text-left margenes-menu-lat">
          <p className="menu-label">
            Users
          </p>
          <ul className="menu-list">
            <li onClick={((e) => this._elementClicked(e, "userParams"))}><Link to='/userParams'>Usuarios</Link></li>
          </ul>
          <p className="menu-label">
            Tiendas
          </p>
          <ul className="menu-list">
            <li onClick={((e) => this._elementClicked(e, "stores"))}><Link to='/stores'>Tiendas</Link></li>
          </ul>
          <p className="menu-label">
            Productos
          </p>
          <ul className="menu-list">
            <li onClick={((e) => this._elementClicked(e, "products"))}><Link to='/products'>Productos</Link></li>
          </ul>

          </aside>
        </div>
    )
  }
}
