import React, { useState, useEffect } from 'react'
import axios from 'axios'

function OldCodeToBeRemoved() {
	const [val, setVal] = useState(true)
	const [name, setName] = useState('Bob')
	const [books, setBooks] = useState([])

	const getBooks = () => {
		axios.get(`https://www.googleapis.com/books/v1/volumes?q=Lord of the Rings&maxResults=10`)
			.then(function (response) {
				console.log(response)
				response.data.items.map((book, index) => console.log(index + 1, ': ', book))
				setBooks(response.data.items)
			})
			.catch(function (error) {
				console.log(error)
			})
			.then(function () {
				// console.log('this will always executed')
			})
	}

	const getABook = () => {
		fetch(`https://www.googleapis.com/books/v1/volumes/yl4dILkcqm4C`)
			.then((response) => {
				return response.json();
			})
			.then((myJson) => {
				console.log(myJson);
			});
	}

	return (
		<div className="App">
            <hr />
			<button onClick={() => setVal(!val)}>Change</button>
			<button onClick={() => setName(prevName => prevName + '!')}>Name</button>
			{val ? <p>Is true</p> : <h2>Is false</h2>}
			{name}
			<hr />
			<button onClick={getBooks}>Get Books</button>
			<button onClick={getABook}>Get A Book</button>
			{books.map((book, index) => <p key={book.id}>{index + 1}: {book.volumeInfo.title} - {book.volumeInfo.subtitle} <b>by</b> {book.volumeInfo.authors.map(author => author)}</p>)}
		</div>
	)
}

export default OldCodeToBeRemoved
