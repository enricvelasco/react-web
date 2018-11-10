import React, { Component } from 'react';
import {Login} from "./Login"
import firebase from 'firebase'
//import db from '../../firebase'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';


const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);

export class PrincipalPage extends Component{
  constructor(props){
    super(props)

    this.appState = this.props.appState
  }

  _test=()=>{
    console.log("TEST");
    this.appState.notification={
      type:3,
      message:"hola amigos"
    }
    this.props.onResults(this.appState)
  }

  _appStateReturn=(appStateReturned)=>{

    console.log("APPSTATE RETURNED", appStateReturned);
    this.props.onResults(appStateReturned)
  }

  render(){
    return(
      <div className="margin-principal-page container">
        <div className="tile is-ancestor">
          <div className="tile is-parent box-login">
            <article className="tile is-child box">
              <Login onAppStateReturn={this._appStateReturn} appState={this.appState}/>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">Foo</p>
              <p className="subtitle">Bar</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">Third column</p>
              <p className="subtitle">With some content</p>
              <div className="content">
                <button className="button is-link margin-button" onClick={this._test}>TEST</button>
              </div>
            </article>
          </div>
          </div>

          <div className="tile is-ancestor">
          <div className="tile is-vertical is-8">
            <div className="tile">
              <div className="tile is-parent is-vertical">
                <article className="tile is-child box">
                  <p className="title">Vertical tiles</p>
                  <p className="subtitle">Top box</p>
                </article>
                <article className="tile is-child box">
                  <p className="title">Vertical tiles</p>
                  <p className="subtitle">Bottom box</p>
                </article>
              </div>
              <div className="tile is-parent">
                <article className="tile is-child box">
                  <p className="title">Middle box</p>
                  <p className="subtitle">With an image</p>
                  <figure className="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/640x480.png"/>
                  </figure>
                </article>
              </div>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child box">
                <p className="title">Wide column</p>
                <p className="subtitle">Aligned with the right column</p>
                <div className="content">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
                </div>
              </article>
            </div>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <div className="content">
                <p className="title">Tall column</p>
                <p className="subtitle">With even more content</p>
                <div className="content">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.</p>
                  <p>Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis. Pellentesque interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet erat. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Aenean vitae gravida diam, finibus dignissim turpis. Sed eget varius ligula, at volutpat tortor.</p>
                  <p>Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue lectus dolor consequat libero. Donec leo ligula, maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis faucibus libero. Quisque non semper leo.</p>
                </div>
              </div>
            </article>
          </div>
          </div>

          <div className="tile is-ancestor">
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">Side column</p>
              <p className="subtitle">With some content</p>
              <div className="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
              </div>
            </article>
          </div>
          <div className="tile is-parent is-8">
            <article className="tile is-child box">
              <p className="title">Main column</p>
              <p className="subtitle">With some content</p>
              <div className="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
              </div>
            </article>
          </div>
          </div>
        </div>
    )
  }
}
