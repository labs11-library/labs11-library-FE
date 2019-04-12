import React, { Component } from "react";
import axios from "axios";
import "./bookmapview.css";
import baseUrl from "../../url";
import Loading from "../Loading/Loading";
import { connect } from "react-redux";
import { getSingleUser } from "../../redux/actions/userActions.js";
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
    this.props.getSingleUser(this.props.owner);
    this.renderMap();
  }
  componentWillReceiveProps(newProps) {
    if (newProps.loading === false) {
      this.setState({
        location: {
          lat: Number(newProps.user.latitude),
          lng: Number(newProps.user.longitude)
        },
        zoom: 11
      });
      this.renderMap();
    }
  }
  // Render map
  renderMap = () => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyDIJcFHjpKOntKFaZR6mBW6YnPY8130Kt4&libraries=places&callback=initMap`
    );
    window.initMap = this.initMap;
  };

  initMap = () => {
    // Create A Map
    var map = new window.google.maps.Map(document.getElementById("map2"), {
      center: this.state.location,
      zoom: this.state.zoom,
      mapTypeControl: false
    });

    // ----------------------------SEARCH BAR STUFF -------------------------//

    let contentString = `${this.props.user.firstName}'s location`;

    // Create Info Window for all users
    var infowindow = new window.google.maps.InfoWindow({
      content: contentString
    });
    // Create markers for all users
    var marker = new window.google.maps.Marker({
      position: {
        lat: this.state.location.lat,
        lng: this.state.location.lng
      },
      map: map,
      title: `${this.props.user.firstName}'s location`
    });

    // Opens Info Window when marker is clicked
    marker.addListener("click", function() {
      infowindow.open(map, marker);
    });
  };

  render() {
    if (this.props.loading) {
      return <Loading />;
    } else {
      return (
        <main>
          <div id="map2" />
        </main>
      );
    }
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

const mapStateToProps = state => ({
  user: state.userReducer.singleUser,
  loading: state.userReducer.loadingUsers
});

export default connect(
  mapStateToProps,
  { getSingleUser }
)(Mapview);
