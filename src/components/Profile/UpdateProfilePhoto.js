import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

export default class ContactForm extends React.Component {

    render() {
        <Dropzone
        onDrop={this.onImageDrop.bind(this)}
        accept="image/*"
        multiple={false}>
          {({getRootProps, getInputProps}) => {
            return (
              <div
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {
                <p>Try dropping some files here, or click to select files to upload.</p>
                }
              </div>
            )
        }}
      </Dropzone>
    }