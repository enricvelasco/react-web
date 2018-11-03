import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {NavBarAdmin} from "./NavBarAdmin"

export class LateralMenu extends Component{
  /*_selectItemMenu=(e, url)=>{
    console.log("SELECCIONA MENU", url);
    this.props.onResults(url)
  }*/
  constructor(props){
    super(props)
  }

  _elementClicked=(e, url)=>{
    this.props.onItemSelected(url)
  }

  render(){
    return(
        <div>
          <aside className="menu has-text-left margenes-menu-lat">
            <li onClick={((e) => this._elementClicked(e, "initial"))}><Link to='/initial'>Initial</Link></li>
            <p className="menu-label">
              Dominios
            </p>
            <ul className="menu-list">
              <li onClick={((e) => this._elementClicked(e, "association"))}><Link to='/association'>Asociaciones</Link></li>
            </ul>
            <p className="menu-label">
              Users
            </p>
            <ul className="menu-list">
              <li onClick={((e) => this._elementClicked(e, "userParams"))}><Link to='/userParams'>Users Params</Link></li>
              <li onClick={((e) => this._elementClicked(e, "usersLevels"))}><Link to='/usersLevels'>User Levels</Link></li>
            </ul>
            <p className="menu-label">
              Productos
            </p>
            <ul className="menu-list">
              <li onClick={((e) => this._elementClicked(e, "productCategories"))}><Link to='/productCategories'>Categorías de Productos</Link></li>
              <li onClick={((e) => this._elementClicked(e, "products"))}><Link to='/products'>Productos</Link></li>
            </ul>
            <p className="menu-label">
              Tiendas
            </p>
            <ul className="menu-list">
              <li onClick={((e) => this._elementClicked(e, "storeCategories"))}><Link to='/storeCategories'>Categorías de Tiendas</Link></li>
              <li onClick={((e) => this._elementClicked(e, "stores"))}><Link to='/stores'>Tiendas de Asociaciones</Link></li>
              <li onClick={((e) => this._elementClicked(e, "storesWithoutAsoc"))}><Link to='/storesWithoutAsoc'>Tiendas sin asociacion</Link></li>
            </ul>
            </aside>
          </div>
    )
  }
}
