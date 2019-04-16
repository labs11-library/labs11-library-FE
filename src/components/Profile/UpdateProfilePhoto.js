// import React, { Component } from 'react';
// import axios from 'axios';
// import baseUrl from '../../url.js';
// import { connect } from "react-redux";
// import { editProfile } from "../../redux/actions/authActions.js";


// class UpdateProfilePhoto extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             image: '',
//             selectedFile: null,
//         };
//     };

//    changeHandler = e => {
//       e.preventDefault();
//       this.setState({
//          [e.target.name]: e.target.value,
//       });
//    };

//    fileHandler = e => {
//       this.setState({ selectedFile: e.target.files[0] });
//    };
//     editProfilePic = e => {
//         e.preventDefault();
//         this.props.editProfile(this.state);
//     };

//    uploadImg = e => {
//       e.preventDefault();
//       let userId = localStorage.getItem("userId");
//       const fd = new FormData();
//       fd.append('image', this.state.selectedFile);

//       axios
//          .post(`${baseUrl}/upload`, fd)
//          .then(res => {
//             console.log('res', res);
//             this.setState({ image: res.data.image });
//             this.props.editProfile(this.state);
//          })
//          .catch(err => console.log(err));
//    };
  

//    render() {
//       return (
//          <div className="profileUpdate">
//             <h1>Update your profile photo</h1>
//             <form method="/POST" encType="multipart/form-data">
//                <div className="form-group">
//                   <label htmlFor="image">Upload image: </label>
//                   <input
//                      onChange={this.fileHandler}
//                      type="file"
//                      id="image"
//                      name="image"
//                      accept="image/*"
//                      required
//                   />
//                   <button onClick={this.uploadImg}>Upload</button>
//                </div>

               
//             </form>
//          </div>
//       );
//    }
// }

// const mapStateToProps = state => ({
//     loading: state.authReducer.fetchingUser,
//     loggedInUser: state.authReducer.loggedInUser
//   });
//   export default connect(
//     mapStateToProps,
//     { editProfile }
//   )(UpdateProfilePhoto);