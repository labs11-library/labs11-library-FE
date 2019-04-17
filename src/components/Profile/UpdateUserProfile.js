import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { editProfile } from "../../redux/actions/authActions.js";
import styled from "styled-components";
import axios from 'axios';
import baseUrl from '../../url.js';
// import UpdateProfilePhoto from "./UpdateProfilePhoto";
const FormWrapper = styled.form`
  width: 95%;
  max-width: 600px;
  margin: 0 auto;
`;
const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;
class UpdateUserProfile extends Component {
  constructor(props) {
    super(props);
    const { firstName, lastName, email, bio, userId, picture } = this.props.loggedInUser;
    this.state = {
      firstName,
      lastName,
      email,
      bio,
      userId,
      picture,
      latitude: null,
      longitude: null,
      image: '',
      selectedFile: null,
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.loggedInUser !== newProps.loggedInUser) {
      this.props.toggleUpdate();
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  editProfile = e => {
    e.preventDefault();
    this.props.editProfile({
      firstName: this.state.firstName,
      lastName: this.state.lasName,
      email: this.state.email,
      bio: this.state.bio,
      picture: this.state.picture
    });
  };

  changeLocation = e => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(position => {
      this.props.editProfile({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  };

  fileHandler = e => {
    this.setState({ selectedFile: e.target.files[0] });
 };

  editProfilePic = e => {
      e.preventDefault();
      this.props.editProfile(this.state);
  };

 uploadImg = e => {
    e.preventDefault();
    // let userId = localStorage.getItem("userId");
    const fd = new FormData();
    fd.append('image', this.state.selectedFile);

    axios
       .post(`${baseUrl}/upload`, fd)
       .then(res => {
          console.log('res', res);
          this.setState({ 
            image: res.data.image,
            picture:res.data.image
          });
          // this.props.editProfile(this.state);
       })
      //  .then(res => {
      //   this.props.editProfile({
      //     image: res.data.image,
      //     picture:this.state.image
      //   })
      //  })
       .catch(err => console.log(err));
 };
  render() {
    return (
      <div>
      
      <FormWrapper>
      <Avatar src={this.state.picture} />
        <NameWrapper>
          <TextField
            type="text"
            label="First name"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            style={{ width: "49%" }}
          />
          <TextField
            type="text"
            label="Last name"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            style={{ width: "49%" }}
          />
        </NameWrapper>
        <TextField
          type="email"
          label="Email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          style={{ width: "100%", marginBottom: "5px" }}
        />
        <TextField
          type="text-area"
          label="Bio"
          name="bio"
          multiline
          fullWidth
          value={this.state.bio}
          onChange={this.handleChange}
          // style={{ padding: "5px" }}
        />
        <Button
          variant="contained"
          onClick={this.editProfile}
          style={{ margin: "5px", marginLeft:"-1px" }}
          color="primary"
        >
          Save Updates
        </Button>
        <Button
          variant="outlined"
          onClick={this.changeLocation}
          style={{ margin: "5px" }}
          color="primary"
        >
          Update your location
        </Button>
        {/* </div> */}
      </FormWrapper>
      <FormWrapper>
            <h1 style={{fontSize:"1rem", marginTop:"2%"}}>Update your profile photo</h1>
            <form method="/POST" encType="multipart/form-data">
               <div className="form-group">
                  <label htmlFor="image" style={{fontSize:".9rem", marginTop:"2%"}}>Upload image: </label>
                  <input
                     onChange={this.fileHandler}
                     type="file"
                     id="image"
                     name="image"
                     accept="image/*"
                     required
                  />
                  <Button style={{ marginLeft: "-6%", marginTop:"-3%" }} color="primary" variant="outlined" onClick={this.uploadImg}>Upload</Button>
               </div>
            </form>
         </FormWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.authReducer.fetchingUser,
  loggedInUser: state.authReducer.loggedInUser
});
export default connect(
  mapStateToProps,
  { editProfile }
)(UpdateUserProfile);
