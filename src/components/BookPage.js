import React, { Component } from "react";
import books from "../data";
import BookDetails from "./BookDetails";

class BookPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: books
		};
	}

	render() {
		return (
			<div>
				<BookDetails />
			</div>
		);
	}
}

export default BookPage;
