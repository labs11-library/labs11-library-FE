import React from "react";
import { Route } from "react-router-dom";

import InventoryList from "../Inventory/InventoryList.js";
import ProfileNavBar from "./ProfileNavBar.js";
import CheckedOutList from "../CheckedOut/CheckedOutList.js";
import BookSearch from "../AddBook/BookSearch.js";
import UserProfile from "./UserProfile.js";
import RequestList from "../Requests/RequestList.js";
import SingleRequest from "../Requests/SingleRequest.js";
import SingleCheckedOutBook from "../CheckedOut/SingleCheckedOutBook.js";

const MyLibrary = props => {
  return (
    <div>
      <React.Fragment>
        <ProfileNavBar />
        <Route
          exact
          path="/library/inventory"
          render={props => <InventoryList {...props} />}
        />
        <Route
          exact
          path="/library/add-book"
          render={props => <BookSearch {...props} />}
        />
        <Route
          exact
          path="/library/checkouts"
          render={props => <CheckedOutList {...props} />}
        />
        <Route
          exact
          path="/library/checkout/:checkoutId"
          render={props => <SingleCheckedOutBook {...props} />}
        />
        <Route
          exact
          path="/library/my-info"
          render={props => <UserProfile {...props} />}
        />
        <Route
          exact
          path="/library/requests"
          render={props => <RequestList {...props} />}
        />
        <Route
          exact
          path="/library/requests/:checkoutRequestId"
          render={props => <SingleRequest {...props} />}
        />
      </React.Fragment>
    </div>
  );
};

export default MyLibrary;
