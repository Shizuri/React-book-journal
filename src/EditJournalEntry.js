// This component holds the form to enter/edit information about the journal entry.
import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { JournalContext } from './journalContext'
import './EditJournalEntry.css'
import Ratings from 'react-ratings-declarative'

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

    const handleSaveChanges = event => {
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

        document.title = `Editing ${bookTitle}`
    }, [bookId, bookTitle])

    return (
        <div className='EditJournalEntry'>
            {properlyLoaded ?
                <>
                    <h3>Editing Journal entry about <i>{bookTitle}</i></h3>
                    <div className='EditJournalEntry-container'>
                        <img src={bookThumbnail} alt={bookTitle} className='EditJournalEntry-img' />
                        <form onSubmit={handleSaveChanges} className='EditJournalEntry-form'>
                            <label className='EditJournalEntry-label'>
                                <span className='EditJournalEntry-descriptor'>Started reading on </span><input
                                    type='date'
                                    name='startDate'
                                    value={startDate}
                                    onChange={event => setStartDate(event.target.value)}
                                    className='EditJournalEntry-input'
                                />
                            </label>
                            <label className='EditJournalEntry-label'>
                                <span className='EditJournalEntry-descriptor'>Finished reading on </span><input
                                    type='date'
                                    name='finishDate'
                                    value={finishDate}
                                    onChange={event => setFinishDate(event.target.value)}
                                    className='EditJournalEntry-input'
                                />
                            </label>
                            <label className='EditJournalEntry-label'>
                                <span className='EditJournalEntry-descriptor'>My rating </span>
                                <Ratings
                                    rating={rating}
                                    widgetRatedColors='#A8A5FE'
                                    widgetEmptyColors='#FFF3CD'
                                    widgetHoverColors='#A8A5FE'
                                    widgetSpacings='5px'
                                    widgetDimensions='45px'
                                    changeRating={setRating}
                                >
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                </Ratings>
                            </label>
                            <label className='EditJournalEntry-label'>
                                <span className='EditJournalEntry-descriptor'>My review </span><textarea
                                    type='textarea'
                                    name='review'
                                    value={review}
                                    onChange={event => setReview(event.target.value)}
                                    className='EditJournalEntry-input'
                                />
                            </label>
                            <label className='EditJournalEntry-label EditJournalEntry-notes'>
                                <span className='EditJournalEntry-descriptor'>Additional notes </span><textarea
                                    type='text'
                                    name='notes'
                                    value={notes}
                                    onChange={event => setNotes(event.target.value)}
                                    className='EditJournalEntry-input'
                                />
                            </label>
                        </form>
                    </div>

                    <div className='EditJournalEntry-buttons-panel'>
                        <button onClick={handleSaveChanges} className='EditJournalEntry-save-button'>Save changes</button>
                        <button onClick={handleRemoveBook} className='EditJournalEntry-remove-button'>Remove from Journal</button>
                    </div>
                    <button onClick={() => history.push(`/journal/${bookId}`)} className='EditJournalEntry-cancel-button'>Cancel changes</button>
                </>
                : <h2>This journal entry does not exist.</h2>}
        </div>
    )
}

export default EditJournalEntry