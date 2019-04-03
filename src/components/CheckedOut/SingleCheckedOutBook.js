import React, { Component } from "react";
import * as moment from "moment";
import "@progress/kendo-theme-material/dist/all.css";
import { connect } from "react-redux";
import { getSingleCheckout } from "../../redux/actions/checkoutActions.js";
import { getLoggedInUser } from "../../redux/actions/authActions.js";
import ChatApp from "../Chat/ChatApp";

class SingleCheckedOutBook extends Component {

  componentDidMount() {
    const userId = localStorage.getItem('userId')
    this.props.getSingleCheckout(userId, this.props.match.params.checkoutId);
    this.props.getLoggedInUser();
  }

  timeRemaining = (dueDate) => {
    let now = moment(Date.now());
    let end = moment(dueDate);
    let duration = moment.duration(now.diff(end)).humanize();
    return duration;
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    // if (this.props.loadingUser) {
    //   return <h1>Loading...</h1>;
    // } 
    const {
        title,
        authors,
        lender,
        dueDate,
        lenderId,
        borrower,
        borrowerId
      } = this.props.singleCheckout;
    
      const dateDue = moment
            .utc(dueDate)
            .local()
            .format("dddd, MMMM Do");
      const lenderBorrowerName = this.props.singleCheckout.lenderId === localStorage.getItem("userId") ? borrower : lender
      const otherUserId = lenderId === localStorage.getItem("userId") ? borrowerId : lenderId
      console.log("lenderId", lenderId)
      return (
        <div>
              <h2>Talk to {lenderBorrowerName} about returning {title} by {authors}</h2>
              <p>Due: {dateDue} ({this.timeRemaining(dueDate)} from now)</p>
              <ChatApp user={this.props.loggedInUser} otherUserId={otherUserId}/>
        </div>
      );
    } 
  }

const mapStateToProps = state => ({
  loadingCheckouts: state.checkoutReducer.loadingCheckouts,
  loadingUser: state.authReducer.fetchingUser,
  singleCheckout: state.checkoutReducer.singleCheckout,
  loggedInUser: state.authReducer.loggedInUser
});

export default connect(
  mapStateToProps,
  { getSingleCheckout, getLoggedInUser }
)(SingleCheckedOutBook);
