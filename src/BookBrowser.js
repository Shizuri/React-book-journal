import React, { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'
import loadingFountain from './images/loadingFountain.gif'

import Book from './Book'
import { SearchContext } from './searchContext'

const BookBrowser = () => {
    // This allows for the needed data to be availabe to all components even after they are unmounted by react-router
    const { searchTerm, setSearchTerm, bookResults, setBookResults } = useContext(SearchContext)

    const [totalBooksFound, setTotalBooksFound] = useState() // Number of books found
    const [isSearching, setIsSearching] = useState(false) // Is the app waiting for data from Google Books, needed for loading animations
    const [loadedBooksIndex, setLoadedBooksIndex] = useState(0) // Current index of loaded books. Neaded for loading more books
    const [isLoadingMoreBooks, setIsLoadingMoreBooks] = useState(false) // Is the app waiting to load more books from the Google Books API
    const inputRef = useRef(null) // Reference so that the search bar is focused on load.

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
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=${maxResults}`)
            .then(function (response) {
                console.log('response: ', response)
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

        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=${maxResults}&startIndex=${loadedBooksIndex}`)
            .then(function (response) {
                console.log('response of loading more: ', response)
                // If the API runs out of books it does not have 'response.data.items' in the object
                if (response.data.items === undefined) {
                    setIsLoadingMoreBooks(false)
                } else {
                    setBookResults(prevBookResults => [...prevBookResults, ...response.data.items])
                    setIsLoadingMoreBooks(false)
                    setLoadedBooksIndex(prevIndex => prevIndex + response.data.items.length)
                }
            })
            .catch(function (error) {
                setIsLoadingMoreBooks(false)
                console.log('Error!: ', error)
            })
    }

    // Here to focus on the search bar only on the first load of the page
    useEffect(() => {
        inputRef.current.focus()
    }, [])

    // Printing the books
    const booksOutput = () => {
        if (isSearching) {
            return <img src={loadingFountain} alt='Searching...' />
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
    const bookButton = () => {
        if (isLoadingMoreBooks) {
            return <img src={loadingFountain} alt='Loading...' />
        } else {
            return totalBooksFound > 0 ? <button onClick={loadMoreBooks}>Load More Books</button> : null
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='search-box'><i>Search for books by title, authors and ISBN</i></label>
                <br />
                <input
                    type='text'
                    name='search-bar'
                    placeholder='Search for a book'
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                    ref={inputRef}
                />
                <button>Search</button>
            </form>
            {booksOutput()}
            {bookButton()}
        </div >
    )
}

export default BookBrowser

// This component holds all of the logic to find the queried books