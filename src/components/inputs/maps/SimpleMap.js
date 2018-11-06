import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export class SimpleMap extends Component {
  constructor(props){
    super(props)
    this.elements={
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    }
    this._solicitarResultados()
  }/*<Marker
      position={this.elements.center}
    >
  </Marker>*/

  _solicitarResultados=()=>{
      fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDFa7RY03_NVSV-VDs6dIFafo8Tr7yH9fM')
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.json().then(function(data) {
            console.log("****",data);
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
  }


  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: ""/*API KEY*/}}
          defaultCenter={this.elements.center}
          defaultZoom={this.elements.zoom}
        >
        <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>

      </div>
    );
  }
}
