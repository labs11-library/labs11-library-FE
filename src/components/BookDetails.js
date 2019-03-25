import React from 'react'

const BookDetails = (props) => {
  return (
    <div>
      <h2>{props.book.title}</h2>
      <p>by {props.book.author}</p>
      <img alt={props.book.title} src={props.book.image}/>
      <p>Contact {props.book.lenderName}</p>
      <button>Send message</button>
    </div>
  )
}

export default BookDetails
