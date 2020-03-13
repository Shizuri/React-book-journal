// This component displays details about the book.
// If the data is already fetched during the search it will be used right away.
// If is not stored in state it will be feched again from the Google Books API.
import React, { useState, useContext, useEffect } from 'react'
import BookCoverNotAvailable from './images/BookCoverNotAvailable.png'
import { useParams, useHistory } from 'react-router-dom'
import { SearchContext } from './searchContext'
import { JournalContext } from './journalContext'

const BookDetails = props => {
    const { bookId } = useParams() // Get the book id that is sent as the book parametar in the URL
    const history = useHistory() // Browsing history provided by react-router

    const { bookResults } = useContext(SearchContext) // If the page details are already in the bookResults, there is no need to fetch them from the API again
    const { myBooks, addBookToJournal } = useContext(JournalContext) // Function to add the book to the journal
    const bookIsInJournal = myBooks.some(book => book.bookId === bookId) // Check if the book is already in the Journal

    const [book, setBook] = useState({}) // State for the book that we are currently looking at

    // The Google Books API just omits the object property if there is no data! This is how we handle this problem
    const subtitle = book.subtitle ? book.subtitle : <i>Subtitle not available</i>
    const authors = book.authors ? book.authors.map(auth => auth) : <i>Authors not available</i>
    const publisher = book.publisher ? book.publisher : <i>Publisher not available</i>
    const dateOfPublishing = book.publishedDate ? book.publishedDate : <i>Date of publishing not available</i>
    const description = book.description ? book.description : <i>Description not available</i>
    const pageCount = book.pageCount ? book.pageCount : <i>Page count not available</i>
    const categories = book.categories ? book.categories.map(cat => cat) : <i>Categories not available</i>
    const userRatings = book.averageRating ? book.averageRating : <i>User rating not available</i>
    const maturityRating = book.maturityRating ? book.maturityRating === 'MATURE' ?
        'Appropriate only for mature readers' : 'Appropriate for all readers' : <i>User rating not available</i>
    const img = book.imageLinks ? book.imageLinks.thumbnail : BookCoverNotAvailable
    const language = book.language ? book.language : <i>Language rating not available</i>

    useEffect(() => {
        // Get a single book from the Google Books API
        const getABook = () => {
            fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
                .then((response) => {
                    return response.json()
                })
                .then((myJson) => {
                    setBook(myJson.volumeInfo)
                    document.title = myJson.volumeInfo.title
                })
        }

        // If we are missing the data, fetch the data again, but just for this book.
        if (!bookResults.some(book => book.id === bookId)) {
            getABook(bookId)
        } else {
            // If the data is still here from the performed search, get it from Context API
            const foundBook = bookResults.filter(book => book.id === bookId)[0].volumeInfo
            setBook(foundBook)
            document.title = foundBook.title
        }

        // document.title = book.title
    }, [bookId, bookResults])

    // Because of inconsistency issues with the Google Books API some requests require a bit of management 
    const industryIdentifiersPrintout = () => {
        if (!book.industryIdentifiers) {
            return <p>Industry Identifiers: <i>Industry Identifiers not available</i></p>
        } else if (book.industryIdentifiers[0].type === 'OTHER') {
            return <p>Industry identifier: {book.industryIdentifiers[0].identifier}</p>
        } else {
            return (
                <>
                    <p>Industry Identifiers:</p>
                    <p>ISBN 10: {book.industryIdentifiers ? book.industryIdentifiers.filter(isbn => isbn.type === 'ISBN_10')[0].identifier : <i>ISBN 10 not available</i>}</p>
                    <p>ISBN 13: {book.industryIdentifiers ? book.industryIdentifiers.filter(isbn => isbn.type === 'ISBN_13')[0].identifier : <i>ISBN 13 not available</i>}</p>
                </>
            )
        }
    }

    return (
        <div>
            {bookIsInJournal ?
                <span><b>This book is in your Journal</b></span>
                : <button onClick={() => addBookToJournal({id: bookId, title: book.title, img})}>Add to Journal</button>}
            <p>Title: {book.title}</p>
            <p>Subtitle: {subtitle}</p>
            <p>Authors: {authors}</p>
            <p>Publisher: {publisher}</p>
            <p>Date of publishing: {dateOfPublishing}</p>
            <p>Description: {description}</p>
            {industryIdentifiersPrintout()}
            <p>Page count: {pageCount}</p>
            <p>Categories: {categories}</p>
            <p>User rating: {userRatings}</p>
            <p>Мaturity rating: {maturityRating}</p>
            <img src={img} alt={book.title} />
            <p>Language: {language}</p>
            <button onClick={history.goBack}>Back</button>
        </div>
    )
}
export default BookDetails

// Component to show all of the details about a book once it is clicked in the list of queried books