import React from "react";
import { Route } from "react-router-dom";

import InventoryList from "../Inventory/InventoryList.js";
import ProfileNavBar from "./ProfileNavBar.js";
import CheckedOutList from "../CheckedOut/CheckedOutList.js";
import BookSearch from "../AddBook/BookSearch.js";
import UserProfile from "./UserProfile.js";
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
          path="/library/my-info"
          render={props => <UserProfile {...props} />}
        />
      </React.Fragment>
    </div>
  );
};

export default MyLibrary;
