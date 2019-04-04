import React, { Component } from "react";
import * as moment from "moment";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { connect } from "react-redux";
import {
  getSingleInventory,
  editInventory,
  deleteInventory
} from "../../redux/actions/inventoryActions.js";
import { getLoggedInUser } from "../../redux/actions/authActions.js";

import ChatApp from "../Chat/ChatApp";
import UpdateInventoryForm from "./UpdateInventoryForm.js";
import SingleInventoryDetails from "./SingleInventoryDetails.js";

class SingleInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleInventory: {},
      updating: false,
      showChat: false
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.getSingleInventory(userId, this.props.match.params.bookId);
    this.props.getLoggedInUser();
  }
  toggleUpdate = () => {
    this.setState(prevState => {
      return {
        updating: !prevState.updating
      };
    });
  };
  editInventory = state => {
    const userId = localStorage.getItem("userId");
    const { bookId } = this.props.singleInventory;
    this.props.editInventory(userId, bookId, state);
    this.toggleUpdate();
  };
  deleteInventory = (userId, bookId) => {
    this.props.deleteInventory(userId, bookId);
    this.props.history.push("/my-library/inventory");
  };
  timeRemaining = dueDate => {
    let now = moment(Date.now());
    let end = moment(dueDate);
    let duration = moment.duration(now.diff(end)).humanize();
    return duration;
  };
  render() {
    if (!this.props.singleInventory) {
      return <h1>Loading...</h1>;
    } else if (!this.state.updating && !this.state.showChat) {
      return (
        <React.Fragment>
          <div>
            <SingleInventoryDetails
              singleInventory={this.props.singleInventory}
              timeRemaining={this.timeRemaining}
              deleteInventory={this.deleteInventory}
            />
          </div>
          {!this.props.singleInventory.available && (
            <Button
              onClick={() => this.setState({ showChat: true })}
              style={{ height: "36px" }}
            >
              Send Message
            </Button>
          )}
          <Button onClick={this.toggleUpdate}>
            {this.state.updating ? "Cancel Update" : "Update Info"}
          </Button>
        </React.Fragment>
      );
    } else if (this.state.updating) {
      return (
        <React.Fragment>
          <UpdateInventoryForm
            singleInventory={this.props.singleInventory}
            editInventory={this.editInventory}
          />
          <Button onClick={this.toggleUpdate}>
            {this.state.updating ? "Cancel Update" : "Update Info"}
          </Button>
        </React.Fragment>
      );
    } else if (this.state.showChat) {
      return (
        <ChatApp
          user={this.props.loggedInUser}
          otherUserId={this.props.singleInventory.borrowerId}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    loading: state.inventoryReducer.loadingInventory,
    singleInventory: state.inventoryReducer.singleInventory,
    loggedInUser: state.authReducer.loggedInUser
  };
};

export default connect(
  mapStateToProps,
  { getSingleInventory, editInventory, deleteInventory, getLoggedInUser }
)(SingleInventory);
