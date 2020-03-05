import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const JournaEntryDetails = props => {
    // Get the book information passed from JournalEntry as a Link state prop from react-router
    const { state: bookState } = useLocation()
    const { bookId, bookTitle, bookThumbnail } = bookState.book

    return (
        <div>
            <p>My Journal entry about <b>{bookTitle}</b></p>
            <img src={bookThumbnail} alt={bookTitle} />
            <p>Started reading on: </p>
            <p>Finished reading on: </p>
            <p>My rating: </p>
            <p>My review: </p>
            <p>Additional notes: </p>
            <Link to={{
                // Send the pathname and the book information to the clicked link
                pathname: `edit/${bookId}`,
                state: {
                    book: bookState.book
                }
            }}> Add / Edit Journal Entry</Link>
            <button>Remove Book and Entry from Journal</button>
        </div>
    )
}

export default JournaEntryDetails