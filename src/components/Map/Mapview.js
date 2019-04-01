import React, { Component } from "react";
import axios from "axios";
import "./mapview.css";
import backendBaseUrl from "../../url";

// const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

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
    // Gets user location from web browser
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
        this.updateLocation();
      },
      () => {
        // Gets user location from IP address if they block the web browser request
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

  // Render map
  renderMap = () => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyDIJcFHjpKOntKFaZR6mBW6YnPY8130Kt4&callback=initMap`
    );
    window.initMap = this.initMap;
  };

  // Get all users from DB ---- swap line 69 & 70 to go from local to heroku
  getUsers = () => {
    const endPoint = `${backendBaseUrl}/users?`;
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
        // console.log(this.state.users);
      })
      .catch(err => {
        console.log("Error" + err);
      });
  };

  updateLocation = () => {
    let userId = localStorage.getItem("userId");
    console.log(userId);
    axios
      .post(`${backendBaseUrl}/users/${userId}`, {
        latitude: this.state.latitude,
        longitude: this.state.longitude
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  initMap = () => {
    // Create A Map
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: this.state.location,
      zoom: this.state.zoom
    });

    //Map over all users
    this.state.users.map(allUsers => {
      var contentString = `A link to ${
        allUsers.firstName
      }'s bookshelf will be here`;

      // Create Info Window for all users
      var infowindow = new window.google.maps.InfoWindow({
        content: contentString
      });

      // Create markers for all users
      var marker = new window.google.maps.Marker({
        position: {
          lat: parseFloat(allUsers.latitude),
          lng: parseFloat(allUsers.longitude)
        },
        map: map,
        title: allUsers.firstName
      });

      // Opens Info Window when marker is clicked
      marker.addListener("click", function() {
        infowindow.open(map, marker);
      });
    });

    // Create Marker for User
    if (this.state.haveUserLocation) {
      var marker = new window.google.maps.Marker({
        position: this.state.location,
        map: map,
        title: "You are here"
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

// Funky way to load script tag since it would read the index.html
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default Mapview;
