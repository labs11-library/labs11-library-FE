import React, { Component } from "react";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { Link, withRouter } from "react-router-dom";
// import axios from "axios";
// import baseUrl from "../../url";
import {
  BookDetailsWrapper,
  BookImgWrapper,
  BookImg,
  DueDate
} from "../Books/styles";
import { connect } from "react-redux";
import { confirmReturn } from "../../redux/actions/checkoutActions";
import { returnBook } from '../../redux/actions/inventoryActions.js'
import Loading from "../Loading/Loading";

import * as moment from "moment";

class BookDetails extends Component {
  constructor(props) {
    super(props);
  } 
   
  timeRemaining = (dueDate) => {
    let now = moment(Date.now());
    let end = moment(dueDate);
    let duration = moment.duration(now.diff(end)).humanize();
    return duration;
  }
  confirmBookReturn = () => {
    const userId = localStorage.getItem("userId");
    // axios.put(`${baseUrl}/users/${userId}/checkOut/${checkoutId}`, {
    //   returned: true
    // })
    // .then(res => {
    //   return res.data;
    // })
    // axios
    //   .put(`${baseUrl}/books/${bookId}`, { available: true })
    //   .then(res => {
    //     return res.data;
    //   })
    //   .catch(err => console.log(err));
    this.props.confirmReturn(this.props.checkout.checkoutId)
    this.props.returnBook(this.props.checkout.bookId)
    this.props.goToMyLibrary()
    // window.location.reload()
  }
  // componentWillReceiveProps(newProps) {
  //   if(newProps.loadingInventory === false) {
  //     window.location.reload()
  //   }
  // }
  render() {
    console.log(this.props)
    if (this.props.loadingCheckouts || this.props.loadingInventory) {
      return <Loading />
    }

    const {
      title,
      bookId,
      authors,
      image,
      lender,
      checkoutId,
      dueDate,
      lenderId,
      borrower,
      returned,
      checkoutDate
    } = this.props.checkout;
  
    const dateDue = moment
      .utc(dueDate)
      .local()
      .format("dddd, MMMM Do");

    const dateCheckedOut = moment
    .utc(checkoutDate)
    .local()
    .format("dddd, MMMM Do");
  
    const lenderBorrowerName =
      lenderId.toString() === localStorage.getItem("userId") ? borrower : lender;
  
    return (
      <BookDetailsWrapper>
        <BookImgWrapper>
          <BookImg alt={title} src={image} />
        </BookImgWrapper>
        <div>
          <h2>{title}</h2>
          <div>by {authors}</div>
          {!returned && (
            <div>
              <div>Due on: {dateDue}</div>
              <DueDate>Time until due: {this.timeRemaining(dueDate)}</DueDate>
            </div>
          )}
          {returned &&
            <div>
              <p>Checkout date: {dateCheckedOut}</p>
            </div>

          }
          <p>Contact {lenderBorrowerName} to arrange return</p>
          <Link to={`/my-library/checkouts/${checkoutId}`}>
            <Button>Send message</Button>
          </Link>
          {lenderId.toString() === localStorage.getItem("userId") && (
            <Button onClick={this.confirmBookReturn}>Confirm return</Button>
          )}
        </div>
      </BookDetailsWrapper>
    );
  }
};

const mapStateToProps = state => {
  return {
    loadingCheckouts: state.checkoutReducer.loadingCheckouts,
    loadingInventory: state.inventoryReducer.loadingInventory,
  };
};

export default connect(
  mapStateToProps,
  { confirmReturn, returnBook }
)(withRouter(BookDetails));
