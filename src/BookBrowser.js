// This component provides the functionality to search and display books from the Google Books Api.
import './BookBrowser.css'
import './loadingAnimation.css'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import magnifyingGlass from './images/search-magnifying-glass-png-7-transparent-small.png'

import Book from './Book'
import { SearchContext } from './searchContext'

const BookBrowser = props => {
    // This allows for the needed data to be availabe to all components even after they are unmounted by react-router
    const {
        searchTerm,
        setSearchTerm,
        bookResults,
        setBookResults,
        totalBooksFound,
        setTotalBooksFound,
        loadedBooksIndex,
        setLoadedBooksIndex
    } = useContext(SearchContext)

    const [isSearching, setIsSearching] = useState(false) // Is the app waiting for data from Google Books, needed for loading animations
    const [isLoadingMoreBooks, setIsLoadingMoreBooks] = useState(false) // Is the app waiting to load more books from the Google Books API

    const [overlay, setOverlay] = useState('none') // State for the overlay

    // Needed to prevent page reaload, preventing queries from 0 length strins and setting the state of searching for books to ture
    const handleSubmit = event => {
        event.preventDefault()
        if (searchTerm.length > 0) {
            setIsSearching(true)
            getBooks(searchTerm)
        }
    }

    // Getting books from Google Books API
    const getBooks = term => {
        const maxResults = 10
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=${maxResults}&orderBy=relevance`)
            .then(function (response) {
                // If there are no books, update the state to represent that and stop searching
                if (response.data.totalItems === 0) {
                    setBookResults([])
                    setTotalBooksFound(0)
                    setIsSearching(false)
                } else {
                    // If books are found, load them to state and stop searching
                    setBookResults(response.data.items)
                    setTotalBooksFound(response.data.totalItems)
                    setIsSearching(false)
                    // Set the index, needed for loading more books, to the appropriate number
                    if (response.data.totalItems < 10) {
                        setLoadedBooksIndex(response.data.totalItems)
                    } else {
                        setLoadedBooksIndex(maxResults)
                    }
                }
            })
            .catch(function (error) {
                setIsSearching(false)
                console.log('Error!: ', error)
            })
    }

    // Get more books
    const loadMoreBooks = () => {
        const maxResults = 10
        setIsLoadingMoreBooks(true)

        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=${maxResults}&startIndex=${loadedBooksIndex}&orderBy=relevance`)
            .then(function (response) {
                // If the API runs out of books it does not have 'response.data.items' in the object
                if (response.data.items === undefined) {
                    setIsLoadingMoreBooks(false)
                } else {
                    // There is a bug in the Google Books API where they might send the same book more than one time.
                    // The following code filters the duplicates without a noticable performance drop
                    const resultsFromLoadMore = [...response.data.items]
                    const filteredForDublicates = resultsFromLoadMore.filter(result => !bookResults.some(oldEntry => oldEntry.id === result.id))
                    // Updating book results and the search results index
                    setBookResults(prevBookResults => [...prevBookResults, ...filteredForDublicates])
                    setIsLoadingMoreBooks(false)
                    setLoadedBooksIndex(prevIndex => prevIndex + filteredForDublicates.length)
                }
            })
            .catch(function (error) {
                setIsLoadingMoreBooks(false)
            })
    }

    // Here to focus on the search bar only on the first load of the page
    useEffect(() => {
        // inputRef.current.focus()
        document.title = 'Book Browser'
    }, [])

    // Printing the books
    const booksOutput = () => {
        if (isSearching) {
            // Place a loading animation if the data is not fetched yet
            return <div className='loading-animation-container'><div className='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div>
        } else {
            if (totalBooksFound === 0) {
                return <p>No books found for the "{searchTerm}" query.</p>
            }
            return (
                bookResults.map(book => <Book book={book} key={book.id} />)
            )
        }
    }

    // The 'Load More Books' button is replaced with a loading animation at loading times
    const loadMoreBooksButton = () => {
        // Don't show the Load more Books button if a different seach is happening
        if (!isSearching) {
            if (isLoadingMoreBooks) {
                // Place a loading animation if the data is not fetched yet
                return <div className='loading-animation-container'><div className='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div>
            } else {
                // The Load More Books button will stay in place even if there are no more results.
                // This is because the Google Books API is a bit strange. After some time of sending no more results in the array of results
                // it can update itself with new data. Because of this, the LMB button is not conditionally removed if there are no more results.
                return totalBooksFound > 0 ? <button onClick={loadMoreBooks} className='Book-Browser-load-more-books-button'>Load more Books</button> : null
            }
        }
    }

    const toggleOverlay = () => {
        setOverlay(prevOverlay => prevOverlay === 'none' ? 'block' : 'none')
    }

    return (
        <div className='Book-Browser'>
            <div className='Book-Browser-intro'>
                Search for books by title, authors and ISBN,<br />
                    then add books to your Journal to review and catalog
            </div>
            <div className='Book-Browser-search-form-container'>
                <form onSubmit={handleSubmit} className='Book-Browser-search-form'>
                    <input
                        type='text'
                        name='search-bar'
                        placeholder='Search for a book'
                        value={searchTerm}
                        onChange={event => setSearchTerm(event.target.value)}
                        className='Book-Browser-search-bar'
                    />
                    <button className='Book-Browser-search-button'><img src={magnifyingGlass} alt='magnifying glass' /></button>
                </form>
            </div>
            {booksOutput()}
            {loadMoreBooksButton()}
            <div className='Book-Browser-overlay' onClick={toggleOverlay} style={{ display: overlay }}>
                <div className='Book-Browser-overlay-text'>
                    <p>The <b>Book Journal</b> application is a tool for cataloging your books.
                Once you find your books, by using the <i>Google Books API</i>, you can store them in your Journal.
                With it you can note the start and finish date, rate the book and review your experience.</p>
                    <p>This React application was developed by using functional components, hooks and the Context API.</p>
                    <p>Coding and design by <b>Zdravko Mavkov</b></p>
                </div>
            </div>
            <div className='Book-Browser-about-button' onClick={toggleOverlay}>A B O U T</div>
        </div >
    )
}

export default BookBrowser