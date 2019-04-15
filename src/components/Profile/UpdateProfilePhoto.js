// import React, { Component } from 'react';
// import axios from 'axios';
// import baseUrl from '../../url.js';

// export default class UpdateProfilePhoto extends Component {

//     state = {
//         file: null
//     }

//     handleFile(e){
//         let file = e.target.files[0]
//         this.setState({file:file})
//     }

//     handleUpload(e){

//         let file = this.state.file;

//         let formdata = new FormData();

//         formdata.append('image', file)
//         axios({
//             url:`${baseUrl}/user/userId`,
//             method:"POST",
//             headers: {
//                 authorization: token
//             },
//             data: formdata
//         })
//     }

//     render(){
//         return(
//             <div className="profileUpload">
//                 <h1>Profile Photo Upload </h1>
//                 <form>
//                     <label>Select file to upload </label>
//                     <input type="file" name="file" onChange={(e) => this.handFile(e)} />
//                 </form>
//             </div>
//         )
//     }
// }

// import React, { Component } from 'react';

// export default class UpdateProfilePhoto extends Component {
//     render() {
//         return (
//             <div class="container">
//                 <h1>File Upload</h1>
//                 <form action="/upload" method="POST" enctype="multipart/form-data">
//                 <div class="file-field input-field">
//                     <div class="btn grey">
//                     <span>File</span>
//                     <input name="myImage" type="file">
//                     </div>
//                     <div class="file-path-wrapper">
//                     <input class="file-path validate" type="text">
//                     </div>
//                 </div>
//                 <button type="submit" class="btn">Submit</button>
//                 </form>
//                 <br>
//                 <img src="<%= typeof file != 'undefined' ? file : '' %>" class="responsive-img">
//             </div>
//         )
//     }
// }



// import React from 'react';
// import Dropzone from 'react-dropzone';
// import request from 'superagent';

// // const CLOUDINARY_UPLOAD_PRESET = '';
// // const CLOUDINARY_UPLOAD_URL = '';

// export default class UpdateProfilePhoto extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       uploadedFile: null,
//       uploadedFileCloudinaryUrl: ''
//     };
//   }

//   onImageDrop(files) {
//     this.setState({
//       uploadedFile: files[0]
//     });

//     this.handleImageUpload(files[0]);
//   }

//   handleImageUpload(file) {
//     let upload = request.post(CLOUDINARY_UPLOAD_URL)
//                      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
//                      .field('file', file);

//     upload.end((err, response) => {
//       if (err) {
//         console.error(err);
//       }

//       if (response.body.secure_url !== '') {
//         this.setState({
//           uploadedFileCloudinaryUrl: response.body.secure_url
//         });
//       }
//     });
//   }

//   render() {
//     return (
//       <form>
//         <div className="FileUpload">
//           <Dropzone
//             onDrop={this.onImageDrop.bind(this)}
//             multiple={false}
//             accept="image/*">
//             <div>Drop an image or click to select a file to upload.</div>
//           </Dropzone>
//         </div>

//         <div>
//           {this.state.uploadedFileCloudinaryUrl === '' ? null :
//           <div>
//             <p>{this.state.uploadedFile.name}</p>
//             <img src={this.state.uploadedFileCloudinaryUrl} />
//           </div>}
//         </div>
//       </form>
//     )
//   }
// }