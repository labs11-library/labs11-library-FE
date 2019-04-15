import React, { Component } from 'react';

export default class UpdateProfilePhoto extends Component {

    state = {

    }

    handleFile(e){
        
    }

    render(){
        return(
            <div className="profileUpload">
                <h1>Profile Photo Upload </h1>
                <form>
                    <label>Select file to upload </label>
                    <input type="file" name="file" onChange={(e) => this.handFile(e)} />
                </form>
            </div>
        )
    }
}