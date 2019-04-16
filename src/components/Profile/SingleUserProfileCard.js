import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { ProfileWrapper } from "../Styles/UserProfileCardStyles";

const SingleUserProfileCard = props => {
  const { firstName, lastName, bio, picture } = props.singleUser;

  console.log(props.checkouts);
  return (
    <ProfileWrapper>
      <div>
        <Avatar
          src={picture}
          style={{
            height: "80px",
            width: "80px",
            boxShadow:
              "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"
          }}
        />
      </div>
      <div>
        <h1>
          {firstName} {lastName}
        </h1>
        <p>{bio}</p>
      </div>
    </ProfileWrapper>
  );
};

export default SingleUserProfileCard;
