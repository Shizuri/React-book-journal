import React, { useState, useContext, useEffect } from 'react'
import BookCoverNotAvailable from './images/BookCoverNotAvailable.png'
import { useParams } from 'react-router-dom'
import { SearchContext } from './searchContext'

const BookDetails = props => {
    const { bookId } = useParams()
    const { bookResults } = useContext(SearchContext)
    const [book, setBook] = useState({})

    useEffect(() => {
        // Get a single book from the Google Books API
        const getABook = () => {
            fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
                .then((response) => {
                    return response.json()
                })
                .then((myJson) => {
                    setBook(myJson.volumeInfo)
                    console.log('Getting a book from API: ', myJson.volumeInfo)
                })
        }

        // If we are missing the data, in case of a user refres, fetch the data again, but just for this book.
        if (bookResults.length === 0) {
            getABook(bookId)
        } else {
            // If the data is still here, get it from Context API
            setBook(bookResults.filter(book => book.id === bookId)[0].volumeInfo)
        }
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
            <p>Title: {book.title}</p>
            <p>Subtitle: {book.subtitle ? book.subtitle : <i>Subtitle not available</i>}</p>
            <p>Authors: {book.authors ? book.authors.map(auth => auth) : <i>Authors not available</i>}</p>
            <p>Publisher: {book.publisher ? book.publisher : <i>Publisher not available</i>}</p>
            <p>Date of publishing: {book.publishedDate ? book.publishedDate : <i>Date of publishing not available</i>}</p>
            <p>Description: {book.description ? book.description : <i>Description not available</i>}</p>
            {industryIdentifiersPrintout()}
            <p>Page count: {book.pageCount ? book.pageCount : <i>Page count not available</i>}</p>
            <p>Categories: {book.categories ? book.categories.map(cat => cat) : <i>Categories not available</i>}</p>
            <p>User rating: {book.averageRating ? book.averageRating : <i>User rating not available</i>}</p>
            <p>Мaturity rating: {book.maturityRating ? book.maturityRating === 'MATURE' ?
                'Appropriate only for mature readers' : 'Appropriate for all readers' : <i>User rating not available</i>}</p>
            <img src={book.imageLinks ? book.imageLinks.thumbnail : BookCoverNotAvailable} alt={book.title} />
            <p>Language: {book.language ? book.language : <i>Language rating not available</i>}</p>
        </div>
    )
}
export default BookDetails

// Component to show all of the details about a book once it is clicked in the list of queried books