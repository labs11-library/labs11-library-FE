import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
// import { Map, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "./mapview.css";

// const myIcon = L.icon({
//   iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
//   iconSize: [25, 41]
//   // iconAnchor: [22, 94],
//   // popupAnchor: [-10, -90]
// });
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
      // const position = [this.state.lat, this.state.lng];
      // return (
      //   <Map className="map" center={position} zoom={this.state.zoom}>
      //     <TileLayer
      //       attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      //       url="http://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v11/{z}/{x}/{y}.mvt"
      //     />
      //     <Marker position={position} icon={myIcon}>
      //       <Popup>
      //         A pretty CSS3 popup. <br /> Easily customizable.
      //       </Popup>
      //     </Marker>
      //   </Map>
    );
  }
}

export default Mapview;
