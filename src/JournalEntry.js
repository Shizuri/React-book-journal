import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const JournalEntry = props => {
    // Get the book information passed from Journal as a Link state prop from react-router
    const { state: bookState } = useLocation()
    const { bookId, bookTitle, bookThumbnail } = bookState.book
    // console.log(bookId, bookTitle, bookThumbnail)

    return (
        <div>
            <p>My Journal entry about <b>{bookTitle}</b></p>
            <img src={bookThumbnail} alt={bookTitle} />
            <p>Started reading on</p>
            <p>Finished reading on</p>
            <p>My rating</p>
            <p>My opinion</p>
            <p>Additional notes</p>
            <Link to={{
                // Send the pathname and the book information to the clicked link
                pathname: `edit/${bookId}`,
                state: {
                    book: bookState
                }
            }}> Add / Edit Journal Entry</Link>
            <button>Remove Book and Entry from Journal</button>
        </div>
    )
}

export default JournalEntry