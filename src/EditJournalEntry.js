// This component holds the form to enter/edit information about the journal entry.
import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { JournalContext } from './journalContext'
import './EditJournalEntry.css'

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
    const [rating2, setRating2] = useState('')
    const [notes, setNotes] = useState('')

    const handleSaveChanges = event => {
        // event.preventDefault()
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
                                Started reading on <input
                                    type='date'
                                    name='startDate'
                                    value={startDate}
                                    onChange={event => setStartDate(event.target.value)}
                                    className='EditJournalEntry-input'
                                />
                            </label>
                            <label className='EditJournalEntry-label'>
                                Finished reading on <input
                                    type='date'
                                    name='finishDate'
                                    value={finishDate}
                                    onChange={event => setFinishDate(event.target.value)}
                                    className='EditJournalEntry-input'
                                />
                            </label>
                            <label className='EditJournalEntry-label'>
                                My rating <input
                                    type='number'
                                    name='rating'
                                    value={rating}
                                    onChange={event => setRating(event.target.value)}
                                    className='EditJournalEntry-input'
                                    min='1'
                                    max='5'
                                />
                            </label>
                            <label className='EditJournalEntry-label'>
                                My rating 2
                                <input
                                    type='radio'
                                    name='rating2'
                                    value={rating2}
                                    onChange={event => setRating2(1)}
                                    className='EditJournalEntry-input'
                                />
                                <input
                                    type='radio'
                                    name='rating2'
                                    value={rating2}
                                    onChange={event => setRating2(2)}
                                    className='EditJournalEntry-input'
                                />
                                <input
                                    type='radio'
                                    name='rating2'
                                    value={rating2}
                                    onChange={event => setRating2(3)}
                                    className='EditJournalEntry-input'
                                />
                            </label>
                            <fieldset className="rating">
                                <input type="radio" id="star5" name="rating" value="5" /><label className="full" htmlFor="star5" title="Awesome - 5 stars"></label>
                                <input type="radio" id="star4half" name="rating" value="4 and a half" /><label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                                <input type="radio" id="star4" name="rating" value="4" /><label className="full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                                <input type="radio" id="star3half" name="rating" value="3 and a half" /><label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
                                <input type="radio" id="star3" name="rating" value="3" /><label className="full" htmlFor="star3" title="Meh - 3 stars"></label>
                                <input type="radio" id="star2half" name="rating" value="2 and a half" /><label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
                                <input type="radio" id="star2" name="rating" value="2" /><label className="full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                                <input type="radio" id="star1half" name="rating" value="1 and a half" /><label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
                                <input type="radio" id="star1" name="rating" value="1" /><label className="full" htmlFor="star1" title="Bad - 1 star"></label>
                                <input type="radio" id="starhalf" name="rating" value="half" /><label className="half" htmlFor="starhalf" title="Very bad - 0.5 stars"></label>
                            </fieldset>
                            <label className='EditJournalEntry-label'>
                                My review <textarea
                                    type='textarea'
                                    name='review'
                                    value={review}
                                    onChange={event => setReview(event.target.value)}
                                    className='EditJournalEntry-input'
                                />
                            </label>
                            <label className='EditJournalEntry-label EditJournalEntry-notes'>
                                Additional notes <textarea
                                    type='text'
                                    name='notes'
                                    value={notes}
                                    onChange={event => setNotes(event.target.value)}
                                    className='EditJournalEntry-input'
                                />
                            </label>
                        </form>
                    </div>
                    <p>Rating 2: {rating2}</p>

                    <button onClick={handleSaveChanges}>Save changes</button>
                    <button onClick={() => history.push(`/journal/${bookId}`)}>Cancel changes</button>
                    <button onClick={handleRemoveBook}>Remove Book and Entry from Journal</button>
                </>
                : <h2>This journal entry does not exist.</h2>}
        </div>
    )
}

export default EditJournalEntry