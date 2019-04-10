import React, { Component } from "react";
import * as moment from "moment";
import "@progress/kendo-theme-material/dist/all.css";
import Button from "@material-ui/core/Button";
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
import Auth from "../Auth/Auth";

import Loading from "../Loading/Loading.js";
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
    this.props.history.push("/my-library");
  };
  timeRemaining = dueDate => {
    let now = moment(Date.now());
    let end = moment(dueDate);
    let duration = moment.duration(now.diff(end)).humanize();
    return duration;
  };
  render() {
    if (this.props.loading) {
      return <Loading />;
    } else if (!this.state.updating && !this.state.showChat) {
      return (
        <React.Fragment>
          <div style={{ width: "500px", margin: "20px auto" }}>
            <SingleInventoryDetails
              singleInventory={this.props.singleInventory}
              timeRemaining={this.timeRemaining}
              deleteInventory={this.deleteInventory}
              loading={this.props.loading}
            />
            {/* {!this.props.singleInventory.available && (
              <Button
                onClick={() => this.setState({ showChat: true })}
                style={{ height: "36px" }}
              >
                Send Message
              </Button>
            )} */}
            <Button
              variant="outlined"
              color="primary"
              style={{ margin: "10px 10px 0 0" }}
              onClick={this.toggleUpdate}
            >
              {this.state.updating ? "Cancel Changes" : "Update Info"}
            </Button>
            <Button
              onClick={() =>
                this.deleteInventory(
                  this.props.singleInventory.userId,
                  this.props.singleInventory.bookId
                )
              }
              style={{ margin: "10px 10px 0 0" }}
              color="secondary"
            >
              Delete from inventory
            </Button>
          </div>
        </React.Fragment>
      );
    } else if (this.state.updating) {
      return (
        <React.Fragment>
          <div style={{ width: "500px", margin: "20px auto" }}>
            <UpdateInventoryForm
              singleInventory={this.props.singleInventory}
              editInventory={this.editInventory}
            />
            <Button onClick={this.toggleUpdate}>
              {this.state.updating ? "Cancel Changes" : "Edit Details"}
            </Button>
          </div>
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
)(Auth(SingleInventory));
