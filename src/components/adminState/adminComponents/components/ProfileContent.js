import React, { Component } from 'react';

export class ProfileContent extends Component{
  constructor(props){
    super(props)

    this.state = {}
    console.log("PROFILE INFO COMPONENT", props);
  }

  render(){
    return(
      <div>
        <figure className="image is-128x128">
          <img className="is-rounded" src={this.props.userParams.userDomain.logo[0].url}/>
        </figure>
        <div className="align-left">
          <h3>{this.props.userParams.name}</h3>
          <p className="subtitle">{this.props.userParams.code}</p>
          <p className="subtitle is-6">{this.props.userParams.email}</p>
          <p className="subtitle is-6">{this.props.userParams.userDomain.name}</p>
          <p className="subtitle is-6">{this.props.userParams.userDomain.direction.street}, {this.props.userParams.userDomain.direction.number}</p>
        </div>
      </div>
    )
  }
}
