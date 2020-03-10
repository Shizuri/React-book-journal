// This component holds the form to enter/edit information about the journal entry.
import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { JournalContext } from './journalContext'

const EditJournalEntry = props => {
    // If the page is loaded directly by its url, make sure that it's a valid journal entry
    let properlyLoaded = true
    // Get the book id that is sent as the book parametar in the URL
    const { bookId } = useParams()
    let bookTitle, bookThumbnail
    const myBooks = JSON.parse(localStorage.getItem('books') || '[]')
    try {
        ({ bookTitle, bookThumbnail } = myBooks.filter(book => book.bookId === bookId)[0])
    } catch (error) {
        properlyLoaded = false
    }

    // Browsing history provided by react-router, needed to redirect after submit or cancel
    const history = useHistory()

    // Get the removeBookFromJournal function needed from journalContext
    const { removeBookFromJournal } = useContext(JournalContext)

    // State for the form
    const [startDate, setStartDate] = useState('')
    const [finishDate, setFinishDate] = useState('')
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(3)
    const [notes, setNotes] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        // Save the data to localStorage
        const journalEntry = { startDate, finishDate, rating, review, notes }
        localStorage.setItem(bookId, JSON.stringify(journalEntry))
        history.push(`/journal/${bookId}`)
    }

    // Provide a confirmation and page redirection after the book is removed from the Journal
    const handleRemoveBook = () => {
        if (window.confirm(`Are you sure that you want to remove ${bookTitle} from your Journal?`)) {
            removeBookFromJournal(bookId)
            history.push('/journal')
        }
    }

    useEffect(() => {
        // Read data from localStorage and set it to state
        const journalEntry = JSON.parse(localStorage.getItem(bookId))
        if (journalEntry !== null) {
            setStartDate(journalEntry.startDate)
            setFinishDate(journalEntry.finishDate)
            setReview(journalEntry.review)
            setRating(journalEntry.rating)
            setNotes(journalEntry.notes)
        }

        document.title = `Editing: ${bookTitle}`
    }, [bookId, bookTitle])

    return (
        <div>
            {properlyLoaded ?
                <>
                    <span>My journal entry for the book: {bookTitle}</span>
                    <img src={bookThumbnail} alt={bookTitle} />
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <label>
                            Started reading on:
                    <input
                                type='date'
                                name='startDate'
                                value={startDate}
                                onChange={event => setStartDate(event.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Finished reading on:
                    <input
                                type='date'
                                name='finishDate'
                                value={finishDate}
                                onChange={event => setFinishDate(event.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            My rating:
                    <input
                                type='number'
                                name='rating'
                                value={rating}
                                onChange={event => setRating(event.target.value)}
                                min='1'
                                max='5'
                            />
                        </label>
                        <br />
                        <label>
                            My review:
                    <input
                                type='text'
                                name='review'
                                value={review}
                                onChange={event => setReview(event.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Additional notes:
                    <input
                                type='text'
                                name='notes'
                                value={notes}
                                onChange={event => setNotes(event.target.value)}
                            />
                        </label>
                        <br />
                        <input type='submit' value='Submit changes' />
                    </form>
                    <button onClick={() => history.push(`/journal/${bookId}`)}>Cancel changes</button>
                    <br />
                    <button onClick={handleRemoveBook}>Remove Book and Entry from Journal</button>
                </>
                : <h2>This journal entry does not exist.</h2>}
        </div>
    )
}

export default EditJournalEntry