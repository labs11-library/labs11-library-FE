import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// DEFAULT PUBLIC TOKEN
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiamFjb2JsYXl0b24iLCJhIjoiY2p0cHlqZDV6MDFtajQ0cGU0dTYyeXQ4NSJ9.rcJGE61Ad30jvn8UMMtH6A"
});

class Mapview extends Component {
  constructor() {
    super();
    this.state = {
      location: {
        lat: 19.8333333,
        lng: -20
      },
      haveUserLocation: false,
      zoom: [1.2]
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          haveUserLocation: true,
          zoom: [14]
        });
      },
      () => {
        console.log("User blocked access to location");
        fetch("https://ipapi.co/json")
          .then(res => res.json())
          .then(location => {
            console.log(location);
            this.setState({
              location: {
                lat: location.latitude,
                lng: location.longitude
              },
              haveUserLocation: true,
              zoom: [11]
            });
          });
      }
    );
  }

  render() {
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        center={this.state.location}
        zoom={this.state.zoom}
        containerStyle={{
          height: "500px"
          // width: "100vw"
        }}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={this.state.location} />
        </Layer>
      </Map>
    );
  }
}

export default Mapview;
