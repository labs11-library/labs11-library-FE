import React from "react";
import Avatar from "@material-ui/core/Avatar";
import {
  OtherUserCard,
  ProfileWrapper,
  Bio
} from "../Styles/UserProfileCardStyles";

const SingleUserProfileCard = props => {
  const { firstName, lastName, bio, picture } = props.singleUser;
  return (
    <OtherUserCard>
      <ProfileWrapper>
        <Avatar
          src={picture}
          style={{
            height: "80px",
            width: "80px",
            boxShadow:
              "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"
          }}
        />

        <h1>
          {firstName} {lastName}
        </h1>
        <Bio>
          {bio === null || bio === ""
            ? `${firstName} has not provided a bio.`
            : bio}
        </Bio>
      </ProfileWrapper>
    </OtherUserCard>
  );
};

export default SingleUserProfileCard;
