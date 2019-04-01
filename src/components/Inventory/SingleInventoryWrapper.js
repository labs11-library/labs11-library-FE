import React, { Component } from "react";
import * as moment from "moment";
import { Link } from "react-router-dom";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { connect } from "react-redux";
import { getSingleInventory } from "../../redux/actions/inventoryActions.js";

import UpdateInventoryForm from "./UpdateInventoryForm.js";
import SingleInventoryDetails from "./SingleInventoryDetails.js";

class SingleInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleInventory: {},
      updating: false
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.getSingleInventory(userId, this.props.match.params.bookId);
  }
  timeRemaining = dueDate => {
    let now = moment(Date.now());
    let end = moment(dueDate);
    let duration = moment.duration(now.diff(end)).humanize();
    return duration;
  };
  render() {
    if (!this.props.singleInventory) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div>
          <SingleInventoryDetails
            singleInventory={this.props.singleInventory}
            timeRemaining={this.timeRemaining}
          />
          <Button>
            {/* {this.state.updating ? "Cancel Update" : "Update Info"} */}
          </Button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    loading: state.inventoryReducer.loadingInventory,
    singleInventory: state.inventoryReducer.singleInventory
  };
};

export default connect(
  mapStateToProps,
  { getSingleInventory }
)(SingleInventory);
