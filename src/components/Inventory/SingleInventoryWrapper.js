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
import { Link } from "react-router-dom";
import ChatApp from "../Chat/ChatApp";
import UpdateInventoryForm from "./UpdateInventoryForm.js";
import SingleInventoryDetails from "./SingleInventoryDetails.js";
import Auth from "../Auth/Auth";
import DeleteInventory from "./DeleteInventory";
import Loading from "../Loading/Loading.js";
import {
  SingleInventoryContainer,
  CancelChangesButton
} from "../Styles/InventoryStyles";
import { BackButtonWrapper, ChatButtonWrapper } from "../Styles/ChatStyles";

class SingleInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleInventory: {},
      updating: false,
      showChat: false,
      open: false
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.getSingleInventory(userId, this.props.match.params.bookId);
    this.props.getLoggedInUser();
  }
  componentWillReceiveProps(newProps) {
    if (newProps.deletingInventory === true) {
      this.props.history.push("/my-library");
    }
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
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    if (this.props.loading) {
      return <Loading />;
    } else if (!this.state.updating && !this.state.showChat) {
      return (
        <React.Fragment>
          <BackButtonWrapper>
            <Link style={{ textDecoration: "none" }} to="/my-library">
              <Button variant="outlined" color="primary">
                ← Back
              </Button>
            </Link>
          </BackButtonWrapper>
          <SingleInventoryContainer>
            <ChatButtonWrapper>
              <Link style={{ textDecoration: "none" }} to="/my-library">
                <Button variant="outlined" color="primary">
                  ← Back
                </Button>
              </Link>
            </ChatButtonWrapper>
            <SingleInventoryDetails
              singleInventory={this.props.singleInventory}
              timeRemaining={this.timeRemaining}
              deleteInventory={this.deleteInventory}
              loading={this.props.loading}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px 10px 0 0" }}
              onClick={this.toggleUpdate}
            >
              {this.state.updating
                ? "Cancel Changes"
                : this.props.singleInventory.description
                ? "Edit Description"
                : "Add Description"}
            </Button>
            <Button
              variant="outlined"
              onClick={this.handleClickOpen}
              style={{ margin: "10px 10px 0 0" }}
              color="secondary"
            >
              Remove from my library
            </Button>
            <DeleteInventory
              open={this.state.open}
              handleClose={this.handleClose}
              handleClickOpen={this.handleClickOpen}
              deleteInventory={this.deleteInventory}
              singleInventory={this.props.singleInventory}
            />
          </SingleInventoryContainer>
        </React.Fragment>
      );
    } else if (this.state.updating) {
      return (
        <React.Fragment>
          <SingleInventoryContainer>
            <UpdateInventoryForm
              singleInventory={this.props.singleInventory}
              editInventory={this.editInventory}
            />
            <CancelChangesButton>
              <Button
                color="secondary"
                variant="outlined"
                onClick={this.toggleUpdate}
              >
                Cancel Changes
              </Button>
            </CancelChangesButton>
          </SingleInventoryContainer>
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
    deletingInventory: state.inventoryReducer.deletingInventory,
    singleInventory: state.inventoryReducer.singleInventory,
    loggedInUser: state.authReducer.loggedInUser
  };
};

export default connect(
  mapStateToProps,
  { getSingleInventory, editInventory, deleteInventory, getLoggedInUser }
)(Auth(SingleInventory));
