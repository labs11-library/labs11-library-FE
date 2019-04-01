import React from "react";

const SearchedBookTile = props => {
  if (!props.book) {
    return <></>;
  } else
    return (
      <div>
        <img src={props.book.covers[0]} alt={`Cover of ${props.book.title}`} />
        <h2>{props.book.title}</h2>
        <p>by {props.book.authors}</p>
        <button
          onClick={() => {
            props.addBook(props.book);
          }}
        >
          Add book to your library!
        </button>
      </div>
    );
};

export default SearchedBookTile;
