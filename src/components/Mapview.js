import React, { Component } from "react";
// import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
// import mapboxgl from "mapbox-gl/dist/mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import "./mapview.css";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

class Mapview extends Component {
  constructor() {
    super();
    this.state = {
      location: {
        lat: 39.8333333,
        lng: -98.585522
      },
      haveUserLocation: false,
      zoom: 4,
      users: []
    };
  }

  componentDidMount() {
    this.getUsers();
    // this.renderMap();
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          haveUserLocation: true,
          zoom: 15
        });
        this.renderMap();
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
              zoom: 11
            });
            this.renderMap();
          });
      }
    );
  }

  renderMap = () => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`
    );
    window.initMap = this.initMap;
  };

  getUsers = () => {
    const endPoint = "https://book-maps.herokuapp.com/users?";
    const parameters = {
      firstName: "",
      location: ""
    };

    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(res => {
        this.setState(
          {
            users: res.data
          },
          this.renderMap()
        );
        console.log(this.state.users);
      })
      .catch(err => {
        console.log("Error" + err);
      });
  };

  initMap = () => {
    // Create A Map
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: this.state.location,
      zoom: this.state.zoom
    });

    // this.state.users.map(allUsers => {
    //   console.log(allUsers.location);
    //   var marker = new window.google.maps.Marker({
    //     position: allUsers.location,
    //     map: map,
    //     title: "Hello World!"
    //   });
    // });
    if (this.state.haveUserLocation) {
      var marker = new window.google.maps.Marker({
        position: this.state.location,
        map: map,
        title: "Hello World!"
      });
    }
  };

  render() {
    return (
      <main>
        <div id="map" />
      </main>
    );
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default Mapview;
