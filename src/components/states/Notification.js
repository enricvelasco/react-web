import React, { Component } from 'react';

export class Notification extends Component{
  constructor(props){
    super(props)
    this.countInterval = true;
    this.appState = this.props.appState
  }

  componentDidMount() {
      this.interval = setInterval(() => {
        this._closeNotification()
      }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _closeNotification=()=>{
    this.appState.notification = null;
    this.props.onCloseNotification(this.appState)
    //clearInterval(this.interval)

  }


  _loadNotification=()=>{
    switch(this.props.type) {
        case 1://primary
            return(
              <div className="notification is-primary">
                <button className="delete" onClick={this._closeNotification}></button>
                {this.props.message}
              </div>
            )
            break;
        case 2://link
            return(
              <div className="notification is-link">
                <button className="delete" onClick={this._closeNotification}></button>
                {this.props.message}
              </div>
            )
            break;
        case 3://info
            return(
              <div className="notification is-info">
                <button className="delete" onClick={this._closeNotification}></button>
                {this.props.message}
              </div>
            )
            break;
        case 4://success
            return(
              <div className="notification is-success">
                <button className="delete" onClick={this._closeNotification}></button>
                {this.props.message}
              </div>
            )
            break;
        case 5://warning
            return(
              <div className="notification is-warning">
                <button className="delete" onClick={this._closeNotification}></button>
                {this.props.message}
              </div>
            )
            break;
        case 6://danger
            return(
              <div className="notification is-danger">
                <button className="delete" onClick={this._closeNotification}></button>
                {this.props.message}
              </div>
            )
            break;
    }
  }

  render(){
    return(

        <div className="margin-top-pages">
              {this._loadNotification()}
        </div>
    )
  }
}
