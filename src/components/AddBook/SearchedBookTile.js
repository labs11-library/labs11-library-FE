import React from "react";
import Button from "@material-ui/core/Button";
import {
  BookDetailsWrapper,
  BookImgWrapper,
  BookImg,
  BookTextContainer
} from "../Styles/InventoryStyles";

const SearchedBookTile = props => {
  if (!props.book) {
    return <></>;
  } else
    return (
      <BookDetailsWrapper>
        <BookImgWrapper>
          <BookImg
            src={props.book.covers[0]}
            alt={`Cover of ${props.book.title}`}
          />
        </BookImgWrapper>
        <BookTextContainer>
          <h2>
            {props.book.title.substr(0, 25)}
            {props.book.title.length > 25 && "..."}
          </h2>
          <p>by {props.book.authors}</p>
          <Button
            style={{
              width: "100%",
              maxWidth: "180px",
              margin: "2px 0 4px",
              padding: "6px 14px"
            }}
            onClick={() => {
              props.addBook(props.book);
            }}
            variant="contained"
            color="primary"
          >
            Add book to your library
          </Button>
        </BookTextContainer>
      </BookDetailsWrapper>
    );
};

export default SearchedBookTile;
