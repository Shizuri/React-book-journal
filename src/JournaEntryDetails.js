// This component displays the users journal entry for the book that he is reading.
import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { JournalContext } from './journalContext'

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
    }
    // State for display data
    const [startDate, setStartDate] = useState('')
    const [finishDate, setFinishDate] = useState('')
    const [review, setReview] = useState('')
    const [rating, setRating] = useState('')
    const [notes, setNotes] = useState('')
    // Get the removeBookFromJournal function from journalContext
    const { removeBookFromJournal } = useContext(JournalContext)
    // Neaded to redirect back to /journal after the book has been removed
    const history = useHistory()

    // Provide a confirmation and page redirection after the book is removed from the Journal
    const handleRemoveBook = () => {
        if (window.confirm(`Are you sure that you want to remove ${bookTitle} from your Journal?`)) {
            removeBookFromJournal(bookId)
            history.push('/journal')
        }
    }

    useEffect(() => {
        // Read data from localStorage and set it to state for display
        const journalEntry = JSON.parse(localStorage.getItem(bookId))
        if (journalEntry !== null) {
            setStartDate(journalEntry.startDate)
            setFinishDate(journalEntry.finishDate)
            setReview(journalEntry.review)
            setRating(journalEntry.rating)
            setNotes(journalEntry.notes)
        }
    }, [bookId])

    return (
        <div>
            {properlyLoaded ?
                <>
                    <p>My Journal entry about <b>{bookTitle}</b></p>
                    <img src={bookThumbnail} alt={bookTitle} />
                    <p>Started reading on: {startDate}</p>
                    <p>Finished reading on: {finishDate}</p>
                    <p>My rating: {rating}</p>
                    <p>My review: {review}</p>
                    <p>Additional notes: {notes}</p>
                    <Link to={{
                        // Send the pathname and the book information to the clicked link
                        pathname: `edit/${bookId}`,
                        state: {
                            book: bookState.book
                        }
                    }}> Add / Edit Journal Entry</Link>
                    <button onClick={handleRemoveBook}>Remove Book and Entry from Journal</button>
                </>
                : <h2>This page can not be accessed directly.</h2>
            }
        </div>
    )
}

export default JournaEntryDetails