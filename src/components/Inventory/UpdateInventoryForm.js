import React, { Component } from "react";
import { Button } from "@progress/kendo-react-buttons";

class UpdateInventoryForm extends Component {
  state = {
    description: `${this.props.singleInventory.description}`
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          placeholder="Edit the description of your book"
        />
        <Button onClick={() => this.props.editInventory(this.state)}>
          Save Updates
        </Button>
      </div>
    );
  }
}

export default UpdateInventoryForm;
