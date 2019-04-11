import React, { Component } from "react";
import axios from "axios";
import "./mapview.css";
import baseUrl from "../../url";

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
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          haveUserLocation: true,
          zoom: 15
        });
        this.updateLocation();
        this.renderMap();
      },
      () => {
        // Gets user location from IP address if they block the web browser request
        console.log("User blocked access to location");
        fetch("https://ipapi.co/json")
          .then(res => res.json())
          .then(location => {
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
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyDIJcFHjpKOntKFaZR6mBW6YnPY8130Kt4&libraries=places&callback=initMap`
    );
    window.initMap = this.initMap;
  };

  // Get all users from DB ---- swap line 69 & 70 to go from local to heroku
  getUsers = () => {
    const endPoint = `${baseUrl}/users?`;
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
      })
      .catch(err => {
        console.log("Error" + err);
      });
  };

  updateLocation = () => {
    let userId = localStorage.getItem("userId");
    axios
      .put(`${baseUrl}/users/${userId}`, {
        latitude: this.state.location.lat,
        longitude: this.state.location.lng
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
      zoom: this.state.zoom,
      mapTypeControl: false
    });

    //------------------------- SEARCH BAR STUFF -------------------------//

    var input = document.getElementById("pac-input");
    var searchBox = new window.google.maps.places.SearchBox(input);
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

    // var places = searchBox.getPlaces();

    map.addListener("bounds_changed", function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", function() {
      var places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new window.google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        // var icon = {
        //   url: place.icon,
        //   size: new window.google.maps.Size(71, 71),
        //   origin: new window.google.maps.Point(0, 0),
        //   anchor: new window.google.maps.Point(17, 34),
        //   scaledSize: new window.google.maps.Size(25, 25)
        // };

        // // Create a marker for each place.
        // markers.push(
        //   new window.google.maps.Marker({
        //     map: map,
        //     icon: icon,
        //     title: place.name,
        //     position: place.geometry.location
        //   })
        // );

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

    // ----------------------------SEARCH BAR STUFF -------------------------//

    //Map over all users
    this.state.users.map(allUsers => {
      var str = `<a href="https://bookmaps.netlify.com/users/${
        allUsers.userId
      }/library" target="">HERE</a><br>`;
      var contentString = `Click ${str} to visit ${
        allUsers.firstName
      }'s bookshelf`;

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
  };

  render() {
    return (
      <main>
        <div id="map" />
        <input
          id="pac-input"
          className="controls"
          type="text"
          placeholder="Search location"
        />
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
