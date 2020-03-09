import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const JournaEntryDetails = props => {
    // Get the book information passed from JournalEntry as a Link state prop from react-router
    const { state: bookState } = useLocation()
    // If this page is accessed directly, without the needed data passed from the Link leading here, the App will crash. This prevents that.
    let properlyLoaded = true
    let bookId, bookTitle, bookThumbnail
    try {
        ({ bookId, bookTitle, bookThumbnail } = bookState.book)
    } catch (error) {
        properlyLoaded = false
        console.log(error)
    }

    return (
        <div>
            {properlyLoaded ?
                <>
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
                </>
                : <h2>This page can not be accessed directly.</h2>
            }
        </div>
    )
}

export default JournaEntryDetails