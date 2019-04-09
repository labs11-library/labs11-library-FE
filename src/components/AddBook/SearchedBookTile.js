import React from "react";
import Button from "@material-ui/core/Button";
import { BookDetailsWrapper, BookImgWrapper, BookImg, BookTextContainer } from "../Styles/InventoryStyles.js"

const SearchedBookTile = props => {
  if (!props.book) {
    return <></>;
  } else
    return (
      <BookDetailsWrapper>
        <BookImgWrapper>
          <BookImg src={props.book.covers[0]} alt={`Cover of ${props.book.title}`} />
        </BookImgWrapper>
        <BookTextContainer>
          <h2>{props.book.title}</h2>
          <p>by {props.book.authors}</p>
          <Button
            variant="outlined"
            onClick={() => {
              props.addBook(props.book);
            }}
          >
            Add book to your library!
          </Button>
        </BookTextContainer>
      </BookDetailsWrapper>
    );
};

export default SearchedBookTile;
